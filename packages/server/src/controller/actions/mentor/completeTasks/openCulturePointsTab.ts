import { BuildingType } from 'shared/enums/BuildingType.js';
import {
  AccountContext,
} from '../../../../accountContext.js';
import { ensureBuildingSpotPage } from '../../ensurePage.js';

export const openCulturePointsTab = async (): Promise<boolean> => {
  const { villageService } = AccountContext.getContext();

  const building = villageService
    .currentVillage()
    .buildings.spots.buildings()
    .find(
      (b) =>
        (b.type === BuildingType.Residence || b.type === BuildingType.Palace) &&
        b.level.actual >= 1,
    );

  if (!building) {
    return false;
  }

  await ensureBuildingSpotPage(building.fieldId, { name: 's', index: 1 });

  return true;
};
