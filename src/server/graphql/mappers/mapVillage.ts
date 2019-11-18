import { Village } from '../../_models/village/village';
import { IVillage } from '../../_types/graphql';
import { mapResources } from './mapResources';

export const mapVillage = (village: Village): IVillage => {
  const {
    amount,
    capacity,
    production,
  } = village.resources;

  return {
    resources: {
      amount: mapResources(amount),
      production: mapResources(production),
      capacity,
    },
    name: village.name,
    id: village.id,
    coords: village.coords,
  };
};
