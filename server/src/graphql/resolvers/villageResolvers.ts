import { IResolvers } from '../../_types/graphql';
import { villageData } from '../../villageData';

export const villageResolvers: IResolvers = {
  Query: {
    villages: () => villageData.villages,

    village: (parent, args) => villageData.villages.find(village => village.id === args.id),
  },
};
