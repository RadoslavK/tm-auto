import { Tribe } from '../../../_models/enums/tribe.js';
import { GameInfo } from '../../../_models/gameInfo.js';
import { AccountContext } from '../../../accountContext.js';
import { parseMapSize } from '../../../parsers/gameInfo/parseMapSize.js';
import { parseServerSpeed } from '../../../parsers/gameInfo/parseServerSpeed.js';
import { parseTribe } from '../../../parsers/gameInfo/parseTribe.js';
import { accountService } from '../../../services/accountService.js';
import { dataPathService } from '../../../services/dataPathService.js';
import { fileService } from '../../../services/fileService.js';

type SerializableGameInfo = Pick<GameInfo, 'parsed' | 'mapSize' | 'speed' | 'tribe'>;

const serialize = async (gameInfo: SerializableGameInfo, accId: string): Promise<void> => {
  const path = dataPathService.accountPath(accId).context.gameInfo;

  await fileService.save(path, gameInfo);
};

const load = async (gameInfo: GameInfo, accId: string): Promise<void> => {
  const path = dataPathService.accountPath(accId).context.gameInfo;
  const loadedInfo = await fileService.loadInstanceWithoutDefaultValue(path, GameInfo);

  if (!loadedInfo) {
    return;
  }

  gameInfo.parsed = loadedInfo.parsed;
  gameInfo.mapSize = loadedInfo.mapSize;
  gameInfo.speed = loadedInfo.speed;
  gameInfo.tribe = loadedInfo.tribe;
};

export const initGameInfo = async (): Promise<void> => {
  const accId = accountService.getCurrentAccount().id;
  const { gameInfo } = AccountContext.getContext();

  await load(gameInfo, accId);

  if (gameInfo.parsed) {
    return;
  }

  gameInfo.speed = await parseServerSpeed();
  gameInfo.tribe = await parseTribe();
  gameInfo.mapSize = await parseMapSize();
  gameInfo.parsed = true;

  serialize({
    parsed: gameInfo.parsed,
    mapSize: gameInfo.mapSize,
    speed: gameInfo.speed,
    tribe: gameInfo.tribe,
  }, accId);

  AccountContext.getContext().logsService.logText(
    `Player info initialized, Tribe: ${Tribe[gameInfo.tribe]}, Speed: ${
      gameInfo.speed
    }x`,
  );
};
