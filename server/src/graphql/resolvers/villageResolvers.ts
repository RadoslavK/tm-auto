import { IResolvers } from '../../_types/graphql';
import { context } from '../context';
import { mapVillage } from '../mappers/mapVillage';

export const villageResolvers: IResolvers = {
  Query: {
    village: (_, args) => mapVillage(context.villages.village(args.villageId)),

    villages: () => context.villages.all().map(mapVillage),
  },
};
