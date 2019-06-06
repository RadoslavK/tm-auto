import { Village } from '../../_models/village';
import { IResolvers, IVillage } from '../../_types/graphql';

const mapToServer = (village: Village): IVillage => ({
  id: village.id.toString(),
  name: village.name,
});

export const villageResolvers: IResolvers = {
  Query: {
    villageExists: (_, args, context) => context.villageService.hasVillage(+args.villageId),

    villages: (_, __, context) => context.villageService.getVillages().map(mapToServer),
  },
};
