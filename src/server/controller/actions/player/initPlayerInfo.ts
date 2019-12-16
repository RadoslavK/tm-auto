import { Tribe } from '../../../../_shared/types/tribe';
import { accountContext } from '../../../accountContext';
import { getPage } from '../../../browser/getPage';
import { parseServerSpeed } from '../../../parsers/player/parseServerSpeed';
import { parseTribe } from '../../../parsers/player/parseTribe';
import { gameInfoService } from '../../../services/info/gameInfoService';

export const initPlayerInfo = async (): Promise<void> => {
  const { gameInfo } = accountContext;

  const page = await getPage();
  const content = await page.content();
  gameInfoService.hasNewUI = !content.includes('buildingsV1');

  gameInfo.speed = await parseServerSpeed();
  gameInfo.tribe = await parseTribe();

  accountContext.logsService.logText(`Player info initialized, Tribe: ${Tribe[gameInfo.tribe]}, Speed: ${gameInfo.speed}x, New version: ${gameInfoService.hasNewUI}`);
};
