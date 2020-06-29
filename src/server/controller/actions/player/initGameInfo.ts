import { Tribe } from '../../../_models/enums/tribe';
import { getAccountContext } from '../../../accountContext';
import { parseAjaxToken } from '../../../parsers/gameInfo/parseAjaxToken';
import { parseMapSize } from '../../../parsers/gameInfo/parseMapSize';
import { parseServerSpeed } from '../../../parsers/gameInfo/parseServerSpeed';
import { parseTribe } from '../../../parsers/gameInfo/parseTribe';

export const initGameInfo = async (): Promise<void> => {
  const { gameInfo } = getAccountContext();

  gameInfo.speed = await parseServerSpeed();
  gameInfo.tribe = await parseTribe();
  gameInfo.ajaxToken = await parseAjaxToken();
  gameInfo.mapSize = await parseMapSize();

  getAccountContext().logsService.logText(
    `Player info initialized, Tribe: ${Tribe[gameInfo.tribe]}, Speed: ${
      gameInfo.speed
    }x`,
  );
};
