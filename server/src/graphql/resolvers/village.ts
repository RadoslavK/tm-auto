import { IResolver } from '../types/IResolver';
import { Village } from '../../controller/models/village';
import { IVillage } from '../../../../_shared/contract/models/IVillage';

export const villageData = {
  villages: [
    new Village({
      id: 1,
      name: 'Village',
    }),
  ],
};

export const village: IResolver = {
  Query: {
    villages: (): readonly IVillage[] => villageData.villages,

    village: (_, { id }): IVillage => villageData.villages.find(village => village.id === id),
  },
};
