import { TravianPath } from '../../../_enums/travianPath.js';
import {
  AccountContext,
} from '../../../accountContext.js';
import { parseVillageCapacity } from '../../../parsers/villages/parseVillageCapacity.js';
import { parseVillageProduction } from '../../../parsers/villages/parseVillageProduction.js';
import { parseVillageResources } from '../../../parsers/villages/parseVillageResources.js';
import { ensurePage } from '../ensurePage.js';

export const updateResources = async (): Promise<void> => {
  await ensurePage(TravianPath.ResourceFieldsOverview);

  const village = AccountContext.getContext().villageService.currentVillage();
  const resources = await parseVillageResources();
  const capacity = await parseVillageCapacity();
  const production = await parseVillageProduction();

  village.resources.capacity = capacity;
  village.resources.production = production;
  village.resources.amount = resources;
};

export const updateActualResources = async (): Promise<void> => {
  const village = AccountContext.getContext().villageService.currentVillage();
  village.resources.amount = await parseVillageResources();
};
