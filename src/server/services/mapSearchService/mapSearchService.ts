import { Point } from '../../_models/map/point';
import { MapSearchVillageTile } from '../../_models/map/villageTile';
import { WheatOasis } from '../../_models/map/wheatOasis';
import { MapSearchState } from '../../_types/graphql.type';
import { getAccountContext } from '../../accountContext';
import { BotEvent } from '../../events/botEvent';
import { publishPayloadEvent } from '../../pubSub';
import { getTotalAxisLength } from '../mapScan/utils/getTotalAxisLength';

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
  ): Promise<MapSearchVillageTile[]> => {
    const { mapScanService } = getAccountContext();

    this._state = MapSearchState.Scanning;

    // sqrt(10*10*2) - sqrt (7*7*2) = sqrt (3*3*2)
    // sqrt(17*17*2) - sqrt (14*14*2) = sqrt (3*3*2)
    const oasisRadius = origin.radius + Math.sqrt(3 * 3 * 2);

    await mapScanService.scanMap({
      ...origin,
      // to scan for oases in 7x7
      radius: oasisRadius,
    });

    this._state = MapSearchState.Searching;

    publishPayloadEvent(BotEvent.MapSearchStateChanged, {
      state: MapSearchState.Searching,
    });

    const villageTiles = await mapScanService.getScannedVillages();
    const oases = await mapScanService.getScannedOases();

    const {
      gameInfo: { mapSize },
    } = getAccountContext();
    const totalAxisLength = getTotalAxisLength(mapSize);

    let shouldSave: boolean = false;

    const villageTilesWithAssignedBonus = Object.entries(villageTiles).reduce(
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
        };
        shouldSave = true;

        return reduced;
      },
      {} as Record<string, Omit<MapSearchVillageTile, 'distance'>>,
    );

    if (shouldSave) {
      mapScanService.updateVillageTiles(villageTilesWithAssignedBonus);
    }

    const result = Object.values(villageTilesWithAssignedBonus)
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

    publishPayloadEvent(BotEvent.MapSearchStateChanged, {
      state: MapSearchState.None,
    });

    return result;
  };
}
