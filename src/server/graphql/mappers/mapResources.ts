import { Resources } from '../../_models/misc/resources';
import { IResources } from '../../_types/graphql';

export const mapResources = (resources: Resources): IResources => ({
  ...resources,
  total: resources.total(),
});
