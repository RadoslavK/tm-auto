import { IResolvers } from '../../_types/graphql';

export const villageResolvers: IResolvers = {
  Query: {
    villageExists: (_, args, context) => context.villageService.hasVillage(args.villageId),

    villages: (_, __, context) => context.villageService.villages(),
  },
};
