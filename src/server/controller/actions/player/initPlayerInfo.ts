import { parseServerSpeed } from '../../../parsers/player/parseServerSpeed';
import { parseTribe } from '../../../parsers/player/parseTribe';
import { accountContext } from '../../../accountContext';
import { ITribe } from '../../../_types/graphql';

export const initPlayerInfo = async (): Promise<void> => {
  const { gameInfo } = accountContext;
  gameInfo.speed = await parseServerSpeed();
  gameInfo.tribe = await parseTribe();

  accountContext.logsService.logText(`Player info initialized, Tribe: ${ITribe[gameInfo.tribe]}, Speed: ${gameInfo.speed}x`);
};
