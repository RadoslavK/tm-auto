import { IResolver } from '../types/IResolver';
import { Village } from '../../controller/models/village';
import { Building } from '../../controller/models/buildings/building';
import { BuildingType } from '../../../../_shared/contract/enums/BuildingType';
import { BuildingLevel } from '../../controller/models/buildings/buildingLevel';
import { IVillage } from '../../../../_shared/contract/models/IVillage';

const villages: readonly IVillage[] = [
  new Village({
    id: 3,
    name: 'first village',
    buildings: [
      new Building({
        type: BuildingType.Wood,
        level: new BuildingLevel({
          actual: 3,
          ongoing: 2,
        }),
      }),
    ],
  }),
];

export const village: IResolver = {
  Query: {
    villages: (): readonly IVillage[] => villages,

    village: (_, { id }): IVillage => villages.find(village => village.id === id),
  },
};
