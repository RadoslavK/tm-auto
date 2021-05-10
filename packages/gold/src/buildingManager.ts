import { TravianPath } from 'server/_enums/travianPath.js';

import { browserManager } from './browserManager.js';
import type { Building } from './buildings.js';

class BuildingManager {
  public build = async (buildings: ReadonlyArray<Building>): Promise<void> => {
    await browserManager.ensurePage(TravianPath.ResourceFieldsOverview);
    await browserManager.ensurePage(TravianPath.InfrastructureOverview);
  };
}

export const buildingManager = new BuildingManager();