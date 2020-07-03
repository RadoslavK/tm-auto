import { Point } from '../../../_models/map/point';

export const getPointId = (point: Point): string => `${point.x}|${point.y}`;
