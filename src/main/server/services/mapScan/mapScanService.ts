import { TravianPath } from '../../_enums/travianPath';
import { VillageTile } from '../../_models/map/villageTile';
import { WheatOasis } from '../../_models/map/wheatOasis';
import { getAccountContext } from '../../accountContext';
import { createPage } from '../../browser/getPage';
import { ensureLoggedIn } from '../../controller/actions/ensureLoggedIn';
import { ensurePage } from '../../controller/actions/ensurePage';
import { BotEvent } from '../../events/botEvent';
import { publishPayloadEvent } from '../../pubSub';
import { dataPathService } from '../dataPathService';
import { fileService } from '../fileService';
import { filterSectorsInRadius } from './utils/filterSectorsInRadius';
import { getAllSectors } from './utils/getAllSectors';
import { getPointId } from './utils/getPointId';
import { getSectorSize } from './utils/getSectorSize';
import { scanSector } from './utils/scanSector';

// 1 - 3
// zoomLevel - 1 = 11x9, 2 = 21x17, 3 = 31x31
const zoomLevel = 3;

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

  private _oases: Record<string, WheatOasis> | undefined;

  private _scannedSectorIds: string[] | undefined;

  private _stopRequested: boolean = false;

  constructor(private accountId: string) {}

  private loadScannedData = async () => {
    this._villages = fileService.load<Record<string, VillageTile>>(
      dataPathService.serverPath(this.accountId).scannedVillageTiles,
      {},
    );

    this._oases = fileService.load<Record<string, WheatOasis>>(
      dataPathService.serverPath(this.accountId).scannedOasisTiles,
      {},
    );

    this._scannedSectorIds = fileService.load<string[]>(
      dataPathService.serverPath(this.accountId).scannedSectors,
      [],
    );

    return {
      villages: this._villages,
      oases: this._oases,
      sectors: this._scannedSectorIds,
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

    await fileService.save(
      dataPathService.serverPath(this.accountId).scannedSectors,
      this._scannedSectorIds,
    );
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

  public getScannedVillages = async (): Promise<
    Record<string, VillageTile>
  > => {
    if (!this._villages) {
      return (await this.loadScannedData()).villages;
    }

    return this._villages;
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
    readonly radius: number;
  }) => {
    this.markProgress(0);

    publishPayloadEvent(BotEvent.MapSearchStateChanged, {
      state: MapSearchState.Scanning,
    });

    const {
      gameInfo: { mapSize },
    } = getAccountContext();

    const scannedSectorIds = new Set<string>(await this.getScannedSectorIds());

    const sectorSize = getSectorSize(zoomLevel);
    const allSectors = getAllSectors({ mapSize, sectorSize });

    const relevantSectorPoints = params
      ? filterSectorsInRadius({
          sectors: allSectors,
          sectorSize,
          mapSize,
          radius: params.radius,
          origin: { x: params.x, y: params.y },
        })
      : allSectors;

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
          getAccountContext().logsService.logError('Failed to scan the map!');

          return;
        }

        try {
          ({ oasesTiles, villageTiles } = await scanSector({
            sector,
            zoomLevel,
            mapSize,
            page,
          }));
        } catch (error) {
          getAccountContext().logsService.logError(error.message);
        }
      } while (!oasesTiles || !villageTiles);

      this._oases = {
        ...(await this.getScannedOases()),
        ...oasesTiles,
      };
      this._villages = {
        ...(await this.getScannedVillages()),
        ...villageTiles,
      };
      const sectors = await this.getScannedSectorIds();

      sectors.push(getPointId(sector));

      this.markProgress((sectors.length / relevantSectorPoints.length) * 100);
      await this.saveScannedData();
    }

    await page.close();
    this.markStopped();
  };

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
