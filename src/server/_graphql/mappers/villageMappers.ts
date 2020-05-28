import { Resources as ResourcesModel } from '../../_models/misc/resources';
import { Village as VillageModel } from '../../_models/village/village';
import {
  Resources,
  Village,
} from '../../_types/graphql';

export const mapResources = (resources: ResourcesModel): Resources => ({
  ...resources,
  total: resources.getTotal(),
});

export const mapVillage = (village: VillageModel): Village => ({
  ...village,
  resources: {
    amount: mapResources(village.resources.amount),
    capacity: village.resources.capacity,
    production: mapResources(village.resources.production),
  },
});