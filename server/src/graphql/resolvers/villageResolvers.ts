import { IVillageRecord } from '../../controller/models/village';
import { villageData } from '../../villageData';
import { IVillage } from '../../../../_shared/contract/models/IVillage';

const mapVillage = (village: IVillageRecord): IVillage => village.toJS();

export const villageResolvers = {
  Query: {
    villages: (): readonly IVillage[] => villageData.villages.map(mapVillage),

    village: (parent, args): IVillage => mapVillage(villageData.villages.find(village => village.id === args.id)),
  },
};
