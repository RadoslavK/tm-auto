import { villageData } from '../../villageData';
import { IVillage } from '../../controller/models/village';

export const villageResolvers = {
  Query: {
    villages: (): readonly IVillage[] => villageData.villages,

    village: (parent, args): IVillage => villageData.villages.find(village => village.id === args.id),
  },
};
