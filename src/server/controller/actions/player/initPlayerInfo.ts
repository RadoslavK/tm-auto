import { ITribe } from '../../../_types/graphql';
import { accountContext } from '../../../accountContext';
import { parseServerSpeed } from '../../../parsers/player/parseServerSpeed';
import { parseTribe } from '../../../parsers/player/parseTribe';

export const initPlayerInfo = async (): Promise<void> => {
  const { gameInfo } = accountContext;
  gameInfo.speed = await parseServerSpeed();
  gameInfo.tribe = await parseTribe();

  accountContext.logsService.logText(`Player info initialized, Tribe: ${ITribe[gameInfo.tribe]}, Speed: ${gameInfo.speed}x`);
};
