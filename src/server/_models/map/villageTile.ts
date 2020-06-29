import { Resources } from '../misc/resources';
import { Point } from './point';

export type VillageTile = Point & {
  readonly type: string;
  readonly claimed?: boolean;
};

export type MapSearchVillageTileBonus = Pick<
  Resources,
  'wood' | 'clay' | 'iron' | 'crop'
>;

export type MapSearchVillageTile = VillageTile & {
  readonly distance: number;
  readonly bonus: MapSearchVillageTileBonus;
};
