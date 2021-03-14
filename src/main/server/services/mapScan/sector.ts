import { Point } from '../../_models/map/point';

export type Sector = Point & {
  readonly index: Point;
};
