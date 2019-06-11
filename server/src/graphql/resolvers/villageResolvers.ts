import { Village } from '../../_models/village/village';
import { IResolvers, IVillage } from '../../_types/graphql';

const mapVillage = (village: Village | undefined): IVillage => village && {
  ...village,
  resources: {
    ...village.resources,
    amount: {
      ...village.resources.amount,
      total: village.resources.amount.total(),
    },
    production: {
      ...village.resources.production,
      total: village.resources.production.total(),
    },
  },
};

export const villageResolvers: IResolvers = {
  Query: {
    village: (_, args, context) => mapVillage(context.villageService.getVillage(args.villageId)),

    villages: (_, __, context) => context.villageService.villages().map(mapVillage),
  },
};
