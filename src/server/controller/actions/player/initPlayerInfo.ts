import { Tribe } from '../../../_models/enums/tribe';
import { getAccountContext } from '../../../accountContext';
import { parseServerSpeed } from '../../../parsers/player/parseServerSpeed';
import { parseTribe } from '../../../parsers/player/parseTribe';

export const initPlayerInfo = async (): Promise<void> => {
  const { gameInfo } = getAccountContext();

  gameInfo.speed = await parseServerSpeed();
  gameInfo.tribe = await parseTribe();

  getAccountContext().logsService.logText(
    `Player info initialized, Tribe: ${Tribe[gameInfo.tribe]}, Speed: ${
      gameInfo.speed
    }x`,
  );
};
