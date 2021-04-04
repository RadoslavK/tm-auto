import type { Duration } from '../../duration.js';
import type { Resources } from '../../misc/resources.js';

export type ExpandedBuilding = {
  readonly buildingTime: Duration;
  readonly cost: Resources;
  readonly level: number;
};