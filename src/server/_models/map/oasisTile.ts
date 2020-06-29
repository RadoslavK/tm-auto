import { Point } from './point';

export type OasisBonuses = {
  readonly wood?: number;
  readonly clay?: number;
  readonly iron?: number;
  readonly crop?: number;
};

export type OasisTile = Point & {
  readonly bonuses: OasisBonuses;
  readonly claimed?: boolean;
};
