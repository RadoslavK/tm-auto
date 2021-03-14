import { BuildingType } from '../../../../../../_shared/enums/BuildingType';
import { getAccountContext } from '../../../../accountContext';
import { ensureBuildingSpotPage } from '../../ensurePage';

export const openCulturePointsTab = async (): Promise<boolean> => {
  const { villageService } = getAccountContext();

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
