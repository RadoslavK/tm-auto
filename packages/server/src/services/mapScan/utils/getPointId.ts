import type { Point } from '../../../_models/map/point.js';

export const getPointId = (point: Point): string => `${point.x}|${point.y}`;
