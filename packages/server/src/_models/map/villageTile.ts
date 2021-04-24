import type { Point } from './point.js';

export type VillageTile = Point & {
  readonly type: string;
  readonly claimed?: boolean;
  readonly cropBonus?: number;
  readonly region?: string;
};

export type RegionTile = Point & {
  readonly name: string;
};

export type MapSearchVillageTile = Omit<VillageTile, 'cropBonus'> & {
  readonly distance: number;
  readonly cropBonus: number;
};
