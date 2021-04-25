import type { Point } from './point.js';

export type VillageTileOasis = {
  readonly type: any;
  readonly count: number;
};

export type VillageTile = Point & {
  readonly type: string;
  readonly claimed?: boolean;
  readonly cropBonus?: number;
  readonly oases?: ReadonlyArray<number>;
  readonly region?: string;
};

export type RegionTile = Point & {
  readonly name: string;
};

export type MapSearchVillageTile = Omit<VillageTile, 'cropBonus' | 'oases'> & {
  readonly distance: number;
  readonly cropBonus: number;
  readonly oases: ReadonlyArray<number>;
};
