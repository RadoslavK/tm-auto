import { TravianPath } from '../../_enums/travianPath.js';
import type {
  RegionTile,
  VillageTile,
} from '../../_models/map/villageTile.js';
import type { WheatOasis } from '../../_models/map/wheatOasis.js';
import { AccountContext } from '../../accountContext.js';
import { createPage } from '../../browser/getPage.js';
import { ensureLoggedIn } from '../../controller/actions/ensureLoggedIn.js';
import { ensurePage } from '../../controller/actions/ensurePage.js';
import { BotEvent } from '../../events/botEvent.js';
import { publishPayloadEvent } from '../../pubSub.js';
import { dataPathService } from '../dataPathService.js';
import { fileService } from '../fileService.js';
import type { Sector } from './sector.js';
import { filterSectorsInRadius } from './utils/filterSectorsInRadius.js';
import { getAllSectors } from './utils/getAllSectors.js';
import { getPointId } from './utils/getPointId.js';
import { getSectorSize } from './utils/getSectorSize.js';
import { scanRegionSector } from './utils/scanRegionSector.js';
import { scanSector } from './utils/scanSector.js';

// 1 - 3
// zoomLevel - 1 = 11x9, 2 = 21x17, 3 = 31x31
export const maxZoomLevel = 3;
//  On Shadow Empires/Factions map, zoom level 3 shows region names only.
const factionsZoomLevel = 2;
const factionsRegionsZoomLevel = 3;

type CurrentScan = {
  readonly progress: number;
};

export enum MapSearchState {
  None = 'None',
  Scanning = 'Scanning',
  Searching = 'Searching'
}

export class MapScanService {
  private _currentScan: CurrentScan | undefined;

  private _villages: Record<string, VillageTile> | undefined;

  private _regions: Record<string, RegionTile> | undefined;

  private _oases: Record<string, WheatOasis> | undefined;

  private _scannedSectorIds: string[] | undefined;

  private _scannedRegionSectorIds: string[] | undefined;

  private _stopRequested: boolean = false;

  constructor(private accountId: string) {}

  private hasFactions = (): boolean => AccountContext.getContext().gameInfo.factions;

  private loadScannedData = async () => {
    this._villages = fileService.load<Record<string, VillageTile>>(
      dataPathService.serverPath(this.accountId).scannedVillageTiles,
      {},
    );

    if (this.hasFactions()) {
      this._regions = fileService.load<Record<string, RegionTile>>(
        dataPathService.serverPath(this.accountId).scannedRegionTiles,
        {},
      );
    }

    this._oases = fileService.load<Record<string, WheatOasis>>(
      dataPathService.serverPath(this.accountId).scannedOasisTiles,
      {},
    );

    this._scannedSectorIds = fileService.load<string[]>(
      dataPathService.serverPath(this.accountId).scannedSectors,
      [],
    );

    if (this.hasFactions()) {
      this._scannedRegionSectorIds = fileService.load<string []>(
        dataPathService.serverPath(this.accountId).scannedRegionSectors,
        [],
      );
    }

    return {
      villages: this._villages,
      oases: this._oases,
      regions: this._regions,
      sectors: this._scannedSectorIds,
      regionSectors: this._scannedRegionSectorIds,
    };
  };

  private saveScannedData = async () => {
    await fileService.save(
      dataPathService.serverPath(this.accountId).scannedVillageTiles,
      this._villages,
    );

    await fileService.save(
      dataPathService.serverPath(this.accountId).scannedOasisTiles,
      this._oases,
    );

    if (this.hasFactions()) {
      await fileService.save(
        dataPathService.serverPath(this.accountId).scannedRegionTiles,
        this._regions,
      );
    }

    await fileService.save(
      dataPathService.serverPath(this.accountId).scannedSectors,
      this._scannedSectorIds,
    );

    if (this.hasFactions()) {
      await fileService.save(
        dataPathService.serverPath(this.accountId).scannedRegionSectors,
        this._scannedRegionSectorIds,
      );
    }
  };

  public updateVillageTiles = async (tiles: Record<string, VillageTile>) => {
    this._villages = tiles;

    await fileService.save(
      dataPathService.serverPath(this.accountId).scannedVillageTiles,
      this._villages,
    );
  };

  public isInProgress = () => !!this._currentScan;

  public getScanProgress = (): number => this._currentScan?.progress ?? 100;

  private getScannedSectorIds = async (): Promise<string[]> => {
    if (!this._scannedSectorIds) {
      return (await this.loadScannedData()).sectors;
    }

    return this._scannedSectorIds;
  };

  private getScannedRegionSectorIds = async (): Promise<string[]> => {
    if (!this._scannedRegionSectorIds) {
      return (await this.loadScannedData()).regionSectors || [];
    }

    return this._scannedRegionSectorIds;
  };

  public getScannedVillages = async (): Promise<Record<string, VillageTile>> => {
    if (!this._villages) {
      return (await this.loadScannedData()).villages;
    }

    return this._villages;
  };

  public getScannedRegions = async (): Promise<Record<string, RegionTile>> => {
    if (!this._regions) {
      return (await this.loadScannedData()).regions || {};
    }

    return this._regions;
  };

  public getScannedOases = async (): Promise<Record<string, WheatOasis>> => {
    if (!this._oases) {
      return (await this.loadScannedData()).oases;
    }

    return this._oases;
  };

  public scanMap = async (params?: {
    readonly x: number;
    readonly y: number;
    readonly oasisRadius: number;
    readonly regionRadius: number;
  }) => {
    this.markProgress(0);

    publishPayloadEvent(BotEvent.MapSearchStateChanged, {
      state: MapSearchState.Scanning,
    });

    const {
      gameInfo: { mapSize },
    } = AccountContext.getContext();

    const scannedSectorIds = new Set<string>(await this.getScannedSectorIds());

    const zoomLevel = this.hasFactions() ? factionsZoomLevel : maxZoomLevel;
    const sectorSize = getSectorSize(zoomLevel);
    const allSectors = getAllSectors({ mapSize, sectorSize });

    const relevantSectorPoints = params
      ? filterSectorsInRadius({
        sectors: allSectors,
        sectorSize,
        mapSize,
        radius: params.oasisRadius,
        origin: { x: params.x, y: params.y },
      })
      : allSectors;

    let relevantRegionSectorPoints: readonly Sector[] = [];

    if (this.hasFactions()) {
      const regionSectorSize = getSectorSize(factionsRegionsZoomLevel);
      const allRegionSectors = getAllSectors({ mapSize, sectorSize: regionSectorSize });

      relevantRegionSectorPoints = params
        ? filterSectorsInRadius({
          sectors: allRegionSectors,
          sectorSize: regionSectorSize,
          mapSize,
          radius: params.regionRadius,
          origin: { x: params.x, y: params.y },
        })
        : allRegionSectors;
    }

    const sectorsToScan = relevantSectorPoints.filter(
      (s) => !scannedSectorIds.has(getPointId(s)),
    );

    const page = await createPage();

    if (sectorsToScan.length) {
      await ensureLoggedIn(page);
      await ensurePage(TravianPath.CenterMap, false, page);
    }

    for (const sector of sectorsToScan) {
      if (this._stopRequested) {
        await page.close();
        this.markStopped();

        return;
      }

      let oasesTiles: Record<string, WheatOasis> | undefined;
      let villageTiles: Record<string, VillageTile> | undefined;
      let attempt = 0;

      do {
        attempt++;

        if (attempt > 3) {
          await page.close();
          this.markStopped();
          AccountContext.getContext().logsService.logError('Failed to scan the map!');

          return;
        }

        try {
          (
            { oasesTiles, villageTiles } = await scanSector({
              sector,
              zoomLevel,
              mapSize,
              page,
            })
          );
        } catch (error) {
          AccountContext.getContext()
            .logsService
            .logError(`Failed map scan for sector [${sector.x}|${sector.y}], message: ${error.message}`);
        }
      } while (!oasesTiles || !villageTiles);

      this._oases = {
        ...(
          await this.getScannedOases()
        ),
        ...oasesTiles,
      };
      this._villages = {
        ...(
          await this.getScannedVillages()
        ),
        ...villageTiles,
      };
      const sectors = await this.getScannedSectorIds();

      sectors.push(getPointId(sector));

      this.markProgress((
        sectors.length / (relevantSectorPoints.length + relevantRegionSectorPoints.length)
      ) * 100);
      await this.saveScannedData();
    }

    if (this.hasFactions()) {
      const scannedRegionSectorIds = new Set<string>(await this.getScannedRegionSectorIds());

      const regionSectorsToScan = relevantRegionSectorPoints.filter(
        (s) => !scannedRegionSectorIds.has(getPointId(s)),
      );

      for (const regionSector of regionSectorsToScan) {
        if (this._stopRequested) {
          await page.close();
          this.markStopped();

          return;
        }

        let regionTiles: Record<string, RegionTile> | undefined;
        let attempt = 0;

        do {
          attempt++;

          if (attempt > 3) {
            await page.close();
            this.markStopped();
            AccountContext.getContext().logsService.logError('Failed to scan the map!');

            return;
          }

          try {
            (
              { regionTiles } = await scanRegionSector({
                sector: regionSector,
                zoomLevel: factionsRegionsZoomLevel,
                mapSize,
                page,
              })
            );
          } catch (error) {
            AccountContext.getContext()
              .logsService
              .logError(`Failed map scan for region sector [${regionSector.x}|${regionSector.y}], message: ${error.message}`);
          }
        } while (!regionTiles);


        this._regions = {
          ...(
            await this.getScannedRegions()
          ),
          ...regionTiles,
        };

        const regionSectors = await this.getScannedRegionSectorIds();

        regionSectors.push(getPointId(regionSector));

        this.markProgress((
          //  all regular sectors are already scanned
          (relevantSectorPoints.length + regionSectors.length) / (relevantSectorPoints.length + relevantRegionSectorPoints.length)
        ) * 100);
        await this.saveScannedData();
      }

      await page.close();
      this.markStopped();
    }
  }

  public stopScan = () => {
    this._stopRequested = true;
  };

  public markProgress = (progress: number) => {
    publishPayloadEvent(BotEvent.MapScanProgressUpdated, {
      scanProgress: progress,
    });

    this._currentScan = progress === 100 ? undefined : { progress };
  };

  private markStopped = () => {
    this._currentScan = undefined;

    publishPayloadEvent(BotEvent.MapSearchStateChanged, {
      state: MapSearchState.None,
    });

    this.markProgress(100);

    this._stopRequested = false;
  };
}
