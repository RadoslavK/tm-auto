import type { Page } from 'puppeteer-core';

import type { Point } from '../../../_models/map/point.js';
import type { VillageTile } from '../../../_models/map/villageTile.js';
import type { WheatOasis } from '../../../_models/map/wheatOasis.js';
import { sendAjaxRequest } from '../../../utils/sendAjaxRequest.js';
import { maxZoomLevel } from '../mapScanService.js';
import { getClaimedVillageTileType } from './getClaimedVillageTileType.js';
import { getPointId } from './getPointId.js';
import { getSectorSize } from './getSectorSize.js';

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
  readonly villageTiles: Record<string, VillageTile>;
  readonly oasesTiles: Record<string, WheatOasis>;
};

const resourcesMap: Record<string, string> = {
  1: 'wood',
  2: 'clay',
  3: 'iron',
  4: 'crop',
};

type OasisBonus = {
  readonly wood?: number;
  readonly clay?: number;
  readonly iron?: number;
  readonly crop?: number;
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

const parseOasisBonuses = (text: string): OasisBonus => {
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
  }, {} as OasisBonus);
};

type Params = {
  readonly sector: Point;
  readonly zoomLevel: number;
  readonly mapSize: number;
  readonly page: Page;
};

/*
 * @param {number} zoomLevel - 1 = 11x9, 2 = 21x17, 3 = 31x31
 */
export const scanSector = async ({
  sector,
  zoomLevel,
  mapSize,
  page,
}: Params): Promise<Result> => {
  const response = await sendAjaxRequest<Response>(
    'mapPositionData',
    {
      data: {
        ignorePositions: [],
        x: sector.x,
        y: sector.y,
        zoomLevel: Math.max(Math.min(zoomLevel, maxZoomLevel), 1),
      },
    },
    page,
  );

  let tiles = response.tiles.map((t) => ({
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
      tiles[getPointId(tile)] = tile;

      return tiles;
    }, {} as Record<string, VillageTile>);

  const claimedTiles = (
    await Promise.all(
      tiles
        .filter((t) => t.title && t.title.includes('{k.dt}'))
        .map(
          async (claimedTile): Promise<VillageTile> => {
            const { x, y } = claimedTile.position;

            const type = await getClaimedVillageTileType(x, y, page);

            return { x, y, type, claimed: true };
          },
        ),
    )
  )
    .filter((t) => Object.values(relevantVillageTileTypes).includes(t.type))
    .reduce((tiles, tile) => {
      tiles[getPointId(tile)] = tile;

      return tiles;
    }, {} as Record<string, VillageTile>);

  const oases = tiles
    .filter(
      (t) =>
        t.title && (t.title.includes('{k.fo}') || t.title.includes('{k.bt}')),
    )
    .reduce((tiles, t) => {
      const { x, y } = t.position;
      const bonuses = parseOasisBonuses(t.text);

      if (!bonuses.crop) {
        return tiles;
      }

      const tile: WheatOasis = {
        x,
        y,
        bonus: bonuses.crop,
        claimed: t.title!.includes('{k.bt}') ? true : undefined,
      };

      tiles[getPointId(tile)] = tile;

      return tiles;
    }, {} as Record<string, WheatOasis>);

  return {
    villageTiles: {
      ...unclaimedTiles,
      ...claimedTiles,
    },
    oasesTiles: oases,
  };
};
