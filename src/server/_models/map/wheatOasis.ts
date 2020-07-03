import { Point } from './point';

export type WheatOasis = Point & {
  readonly bonus: number;
  readonly claimed?: boolean;
};
