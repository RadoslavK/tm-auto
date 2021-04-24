import type { Point } from '../../_models/map/point.js';
import type { MapSearchVillageTile } from '../../_models/map/villageTile.js';
import type { WheatOasis } from '../../_models/map/wheatOasis.js';
import { AccountContext } from '../../accountContext.js';
import { BotEvent } from '../../events/botEvent.js';
import { publishPayloadEvent } from '../../pubSub.js';
import { MapSearchState } from '../mapScan/mapScanService.js';
import { getTotalAxisLength } from '../mapScan/utils/getTotalAxisLength.js';

type Origin = Point & {
  readonly radius: number;
};

const getCoordDifference = (
  point: Point,
  other: Point,
  totalAxisLength: number,
): Point => {
  let xCoordDifference = Math.abs(point.x - other.x);
  let yCoordDifference = Math.abs(point.y - other.y);

  if (Math.sign(point.x * other.x) === -1) {
    xCoordDifference = Math.min(
      xCoordDifference,
      totalAxisLength - xCoordDifference,
    );
  }

  if (Math.sign(point.y * other.y) === -1) {
    yCoordDifference = Math.min(
      yCoordDifference,
      totalAxisLength - yCoordDifference,
    );
  }

  return { x: xCoordDifference, y: yCoordDifference };
};

const getCoordDistance = (
  point: Point,
  other: Point,
  totalAxisLength: number,
) => {
  const difference = getCoordDifference(point, other, totalAxisLength);

  return Math.sqrt(Math.pow(difference.x, 2) + Math.pow(difference.y, 2));
};

const getOasesIn7x7 = (
  oases: Record<string, WheatOasis>,
  x: number,
  y: number,
  totalAxisLength: number,
): readonly WheatOasis[] => {
  return Object.values(oases).filter((o) => {
    const difference = getCoordDifference(
      { x: o.x, y: o.y },
      { x, y },
      totalAxisLength,
    );

    return difference.x <= 3 && difference.y <= 3;
  });
};

export class MapSearchService {
  private _state: MapSearchState = MapSearchState.None;

  public getState = (): MapSearchState => this._state;

  public searchVillageTiles = async (
    types: readonly string[],
    origin: Origin,
    cropBonus: number,
  ) => {
    const { mapScanService } = AccountContext.getContext();

    this._state = MapSearchState.Scanning;

    // sqrt(10*10*2) - sqrt (7*7*2) = sqrt (3*3*2)
    // sqrt(17*17*2) - sqrt (14*14*2) = sqrt (3*3*2)
    const oasisRadius = origin.radius + Math.sqrt(3 * 3 * 2);

    await mapScanService.scanMap({
      ...origin,
      // to scan for oases in 7x7
      oasisRadius,
      regionRadius: origin.radius,
    });

    this._state = MapSearchState.Searching;

    publishPayloadEvent(BotEvent.MapSearchStateChanged, {
      state: MapSearchState.Searching,
    });

    const { factions, mapSize } = AccountContext.getContext().gameInfo;
    const villageTiles = await mapScanService.getScannedVillages();
    const oases = await mapScanService.getScannedOases();
    const regions = factions ? await mapScanService.getScannedRegions() : {};

    const totalAxisLength = getTotalAxisLength(mapSize);

    let shouldSave: boolean = false;

    const assignedVillageTiles = Object.entries(villageTiles).reduce(
      (reduced, [id, tile]) => {
        if (tile.cropBonus !== undefined) {
          reduced[id] = {
            ...tile,
            cropBonus: tile.cropBonus,
          };

          return reduced;
        }

        const cropBonus = getOasesIn7x7(oases, tile.x, tile.y, totalAxisLength)
          .map((v) => v.bonus)
          .sort((bonus1, bonus2) => bonus2 - bonus1)
          .slice(0, 3)
          .reduce((totalBonus, bonus) => totalBonus + bonus, 0);

        reduced[id] = {
          ...tile,
          cropBonus,
          region: factions ? regions[id]?.name : undefined,
        } as Omit<MapSearchVillageTile, 'distance'>;

        shouldSave = true;

        return reduced;
      },
      {} as Record<string, Omit<MapSearchVillageTile, 'distance'>>,
    );

    if (shouldSave) {
      mapScanService.updateVillageTiles(assignedVillageTiles);
    }

    const result = Object.values(assignedVillageTiles)
      .map(
        (tile): MapSearchVillageTile => {
          const distance = getCoordDistance(
            { x: tile.x, y: tile.y },
            { x: origin.x, y: origin.y },
            totalAxisLength,
          );

          return {
            ...tile,
            distance,
          };
        },
      )
      .filter(
        (t) =>
          (!types.length || types.includes(t.type)) &&
          t.distance <= origin.radius &&
          t.cropBonus >= cropBonus,
      );

    this._state = MapSearchState.None;

    publishPayloadEvent(BotEvent.MapSearchFinished, {
      tiles: result,
    });

    publishPayloadEvent(BotEvent.MapSearchStateChanged, {
      state: MapSearchState.None,
    });
  };
}
