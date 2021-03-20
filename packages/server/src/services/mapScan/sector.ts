import type { Point } from '../../_models/map/point.js';

export type Sector = Point & {
  readonly index: Point;
};
