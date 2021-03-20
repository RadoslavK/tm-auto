import { Tribe } from '../../../_models/enums/tribe.js';
import { getAccountContext } from '../../../accountContext.js';
import { parseGameToken } from '../../../parsers/gameInfo/parseGameToken.js';
import { parseMapSize } from '../../../parsers/gameInfo/parseMapSize.js';
import { parseServerSpeed } from '../../../parsers/gameInfo/parseServerSpeed.js';
import { parseTribe } from '../../../parsers/gameInfo/parseTribe.js';

export const initGameInfo = async (): Promise<void> => {
  const { gameInfo } = getAccountContext();

  gameInfo.speed = await parseServerSpeed();
  gameInfo.tribe = await parseTribe();
  gameInfo.token = await parseGameToken();
  gameInfo.mapSize = await parseMapSize();

  getAccountContext().logsService.logText(
    `Player info initialized, Tribe: ${Tribe[gameInfo.tribe]}, Speed: ${
      gameInfo.speed
    }x`,
  );
};
