import { parseServerSpeed } from '../../../parsers/player/parseServerSpeed';
import { parseTribe } from '../../../parsers/player/parseTribe';
import { Tribe } from '../../../_enums/Tribe';
import { accountContext } from '../../../accountContext';

export const initPlayerInfo = async (): Promise<void> => {
  const { gameInfo } = accountContext;
  gameInfo.speed = await parseServerSpeed();
  gameInfo.tribe = await parseTribe();

  accountContext.logsService.logText(`Player info initialized, Tribe: ${Tribe[gameInfo.tribe]}, Speed: ${gameInfo.speed}x`);
};
