import { Point } from '../../../_models/map/point';

export const getSectorId = (sector: Point): string => `${sector.x}|${sector.y}`;
