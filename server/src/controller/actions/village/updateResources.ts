import { TravianPath } from '../../../_enums/TravianPath';
import { context } from '../../../graphql/context';
import { parseVillageCapacity } from '../../../parsers/villages/parseVillageCapacity';
import { parseVillageProduction } from '../../../parsers/villages/parseVillageProduction';
import { parseVillageResources } from '../../../parsers/villages/parseVillageResources';
import { ensurePage } from '../ensurePage';

export const updateResources = async (): Promise<void> => {
  await ensurePage(TravianPath.ResourceFieldsOverview);

  const village = context.villages.village();
  const resources = await parseVillageResources();
  const capacity = await parseVillageCapacity();
  const production = await parseVillageProduction();

  village.resources.capacity = capacity;
  village.resources.production = production;
  village.resources.amount = resources;
};

export const updateActualResources = async (): Promise<void> => {
  const village = context.villages.village();
  village.resources.amount = await parseVillageResources();
};
