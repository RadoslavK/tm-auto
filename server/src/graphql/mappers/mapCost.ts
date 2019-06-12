import { Cost } from '../../_models/misc/cost';
import { ICost } from '../../_types/graphql';
import { mapResources } from './mapResources';

export const mapCost = (cost: Cost): ICost => ({
  buildingTime: cost.buildingTime,
  resources: mapResources(cost.resources),
});
