import { IResources } from '../_types/graphql';

export const getTotalResources = (resources: IResources): number =>
  resources.wood + resources.clay + resources.iron + resources.crop;