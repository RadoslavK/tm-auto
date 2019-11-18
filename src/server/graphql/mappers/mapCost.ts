import { Cost } from '../../_models/misc/cost';
import { ICost } from '../../_types/graphql';
import { mapResources } from './mapResources';

export const mapCost = (cost: Cost): ICost => ({
  buildTime: cost.buildTime,
  resources: mapResources(cost.resources),
});
