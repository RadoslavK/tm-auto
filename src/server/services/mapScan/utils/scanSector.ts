import { OasisBonuses, OasisTile } from '../../../_models/map/oasisTile';
import { Point } from '../../../_models/map/point';
import { VillageTile } from '../../../_models/map/villageTile';
import { sendAjaxRequest } from '../../../utils/sendAjaxRequest';
import { getClaimedVillageTileType } from './getClaimedVillageTileType';
import { getSectorSize } from './getSectorSize';

type Tile = {
  readonly title?: string;
  readonly position: {
    readonly x: string;
    readonly y: string;
  };
  readonly text: string;
};

type Response = {
  readonly tiles: readonly Tile[];
};

type Result = {
  readonly villageTiles: readonly VillageTile[];
  readonly oasesTiles: readonly OasisTile[];
};

const resourcesMap: Record<string, string> = {
  1: 'wood',
  2: 'clay',
  3: 'iron',
  4: 'crop',
};

export const relevantVillageTileTypes: Record<string, string> = {
  '{k.f1}': '3-3-3-9',
  '{k.f6}': '1-1-1-15',
  '{k.f7}': '4-4-3-7',
  '{k.f8}': '3-4-4-7',
  '{k.f9}': '4-3-4-7',
};

const parseVillageTileType = (typeCode: string): string | null =>
  relevantVillageTileTypes[typeCode] || null;

const parseOasisBonuses = (text: string): OasisBonuses => {
  const bonuses = [];
  const regexp = /{a\.r(\d)}\s(\d+)/g;
  let match;

  while ((match = regexp.exec(text)) !== null) {
    const [, res, bonus] = match;

    bonuses.push([resourcesMap[res], +bonus]);
  }

  if (!bonuses.length) {
    throw new Error('Failed to parse oasis bonus');
  }

  return bonuses.reduce((bonuses, [res, bonus]) => {
    return {
      ...bonuses,
      [res]: bonus,
    };
  }, {} as OasisBonuses);
};

type Params = {
  readonly sector: Point;
  readonly zoomLevel: number;
  readonly mapSize: number;
};

/*
 * @param {number} zoomLevel - 1 = 11x9, 2 = 21x17, 3 = 31x31
 */
export const scanSector = async ({
  sector,
  zoomLevel,
  mapSize,
}: Params): Promise<Result> => {
  let tiles = (
    await sendAjaxRequest<Response>('mapPositionData', {
      'data[x]': sector.x.toString(),
      'data[y]': sector.y.toString(),
      'data[zoomLevel]': Math.max(Math.min(zoomLevel, 3), 1).toString(),
    })
  ).tiles.map((t) => ({
    ...t,
    position: {
      x: +t.position.x,
      y: +t.position.y,
    },
  }));

  const sectorSize = getSectorSize(zoomLevel);
  const isXOver = sector.x + sectorSize.x / 2 > mapSize;
  const isYOver = sector.y + sectorSize.y / 2 > mapSize;

  if (isXOver || isYOver) {
    // Remove duplicates.
    tiles = tiles.filter(
      (t) => Math.sign(t.position.x) === 1 && Math.sign(t.position.y) === 1,
    );
  }

  const unclaimedTiles = tiles
    .filter((t) => t.title && t.title.includes('{k.vt}'))
    .reduce((tiles, t) => {
      let type: string | null = t.title!.slice('{k.vt} '.length);
      type = parseVillageTileType(type);

      if (!type) {
        return tiles;
      }

      const { x, y } = t.position;

      const tile: VillageTile = { x, y, type };
      tiles.push(tile);

      return tiles;
    }, [] as VillageTile[]);

  const claimedTiles = (
    await Promise.all(
      tiles
        .filter((t) => t.title && t.title.includes('{k.dt}'))
        .map(
          async (claimedTile): Promise<VillageTile> => {
            const { x, y } = claimedTile.position;

            const type = await getClaimedVillageTileType(x, y);

            return { x, y, type, claimed: true };
          },
        ),
    )
  ).filter((t) => Object.values(relevantVillageTileTypes).includes(t.type));

  const oases = tiles
    .filter(
      (t) =>
        t.title && (t.title.includes('{k.fo}') || t.title.includes('{k.bt}')),
    )
    .reduce((tiles, t) => {
      const { x, y } = t.position;
      const bonuses = parseOasisBonuses(t.text);

      if ((bonuses.crop || 0) <= 0) {
        return tiles;
      }

      const tile: OasisTile = {
        x,
        y,
        bonuses,
        claimed: t.title!.includes('{k.bt}') ? true : undefined,
      };

      return [...tiles, tile];
    }, [] as OasisTile[]);

  return {
    villageTiles: unclaimedTiles.concat(claimedTiles),
    oasesTiles: oases,
  };
};
