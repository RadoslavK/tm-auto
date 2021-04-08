import { TravianPath } from '../../../_enums/travianPath.js';
import type { Coords } from '../../../_models/coords.js';
import { AccountContext } from '../../../accountContext.js';
import { parseAllyId } from '../../../parsers/gameInfo/parseAllyId.js';
import { parseCapitalVillageCoords } from '../../../parsers/gameInfo/parseCapitalVillageCoords.js';
import { ensurePage } from '../ensurePage.js';

export const initializeCapitalAndAlly = async (): Promise<Coords> => {
  await ensurePage(TravianPath.PlayerProfile);

  AccountContext.getContext().gameInfo.allyId = await parseAllyId();
  return await parseCapitalVillageCoords();
};
