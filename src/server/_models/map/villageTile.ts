import { Point } from './point';

export type VillageTile = Point & {
  readonly type: string;
  readonly claimed?: boolean;
  readonly cropBonus?: number;
};

export type MapSearchVillageTile = Omit<VillageTile, 'cropBonus'> & {
  readonly distance: number;
  readonly cropBonus: number;
};
