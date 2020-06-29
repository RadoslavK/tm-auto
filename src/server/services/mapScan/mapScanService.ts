import { OasisTile } from '../../_models/map/oasisTile';
import { Point } from '../../_models/map/point';
import { VillageTile } from '../../_models/map/villageTile';
import { MapSearchState } from '../../_types/graphql.type';
import { getAccountContext } from '../../accountContext';
import { BotEvent } from '../../events/botEvent';
import { publishPayloadEvent } from '../../pubSub';
import { dataPathService } from '../dataPathService';
import { fileService } from '../fileService';
import { filterSectorsInRadius } from './utils/filterSectorsInRadius';
import { getAllSectors } from './utils/getAllSectors';
import { getSectorId } from './utils/getSectorId';
import { getSectorSize } from './utils/getSectorSize';
import { scanSector } from './utils/scanSector';

// 1 - 3
// zoomLevel - 1 = 11x9, 2 = 21x17, 3 = 31x31
const zoomLevel = 3;

type CurrentScan = {
  readonly progress: number;
};

export class MapScanService {
  private _currentScan: CurrentScan | undefined;

  private _villages: VillageTile[] | undefined;

  private _oases: OasisTile[] | undefined;

  private _sectors: Point[] | undefined;

  private _stopRequested: boolean = false;

  constructor(private accountId: string) {}

  private loadScannedData = async () => {
    this._villages = fileService.load<VillageTile[]>(
      dataPathService.serverPath(this.accountId).scannedVillageTiles,
      [],
    );

    this._oases = fileService.load<OasisTile[]>(
      dataPathService.serverPath(this.accountId).scannedOasisTiles,
      [],
    );

    this._sectors = fileService.load<Point[]>(
      dataPathService.serverPath(this.accountId).scannedSectors,
      [],
    );

    return {
      villages: this._villages,
      oases: this._oases,
      sectors: this._sectors,
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
      this._sectors,
    );
  };

  public isInProgress = () => !!this._currentScan;

  public getScanProgress = (): number => this._currentScan?.progress ?? 100;

  private getScannedSectors = async (): Promise<Point[]> => {
    if (!this._sectors) {
      return (await this.loadScannedData()).sectors;
    }

    return this._sectors;
  };

  public getScannedVillages = async (): Promise<VillageTile[]> => {
    if (!this._villages) {
      return (await this.loadScannedData()).villages;
    }

    return this._villages;
  };

  public getScannedOases = async (): Promise<OasisTile[]> => {
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

    const loadedSectors = await this.getScannedSectors();

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

    const scannedSectorIds = new Set<string>(
      loadedSectors.map((s) => getSectorId(s)),
    );

    const sectorsToScan = relevantSectorPoints.filter(
      (s) => !scannedSectorIds.has(getSectorId(s)),
    );

    for (const sector of sectorsToScan) {
      if (this._stopRequested) {
        this.markStopped();

        return;
      }

      let oasesTiles: readonly OasisTile[] | undefined;
      let villageTiles: readonly VillageTile[] | undefined;
      let attempt = 0;

      do {
        attempt++;

        if (attempt > 3) {
          this.stopScan();

          throw new Error('Failed to scan the map!');
        }

        try {
          ({ oasesTiles, villageTiles } = await scanSector({
            sector,
            zoomLevel,
            mapSize,
          }));
        } catch {}
      } while (!oasesTiles || !villageTiles);

      this._oases = (await this.getScannedOases()).concat(oasesTiles);
      this._villages = (await this.getScannedVillages()).concat(villageTiles);
      const sectors = await this.getScannedSectors();

      sectors.push(sector);

      this.markProgress((sectors.length / relevantSectorPoints.length) * 100);
      await this.saveScannedData();
    }

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
