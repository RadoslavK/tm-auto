import type { Point } from './point.js';

export type WheatOasis = Point & {
  readonly bonus: number;
  readonly claimed?: boolean;
};
