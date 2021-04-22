import { Tribe } from '../../../_models/enums/tribe.js';
import type { GameInfo } from '../../../_models/gameInfo.js';
import { AccountContext } from '../../../accountContext.js';
import { parseFactions } from '../../../parsers/gameInfo/parseFactions.js';
import { parseMapSize } from '../../../parsers/gameInfo/parseMapSize.js';
import { parseServerSpeed } from '../../../parsers/gameInfo/parseServerSpeed.js';
import { parseTribe } from '../../../parsers/gameInfo/parseTribe.js';
import { accountService } from '../../../services/accountService.js';
import { dataPathService } from '../../../services/dataPathService.js';
import { fileService } from '../../../services/fileService.js';

type SerializableGameInfo = Pick<GameInfo, 'parsed' | 'mapSize' | 'speed' | 'tribe' | 'factions'>;

const serialize = async (gameInfo: SerializableGameInfo, accId: string): Promise<void> => {
  const path = dataPathService.accountPath(accId).context.gameInfo;

  await fileService.save(path, gameInfo);
};

export const loadGameInfo = async (): Promise<void> => {
  const accId = accountService.getCurrentAccount().id;
  const { gameInfo } = AccountContext.getContext();
  const path = dataPathService.accountPath(accId).context.gameInfo;
  const loadedInfo = await fileService.loadWithoutDefaultValue<SerializableGameInfo>(path);

  if (!loadedInfo) {
    return;
  }

  gameInfo.parsed = loadedInfo.parsed;
  gameInfo.mapSize = loadedInfo.mapSize;
  gameInfo.speed = loadedInfo.speed;
  gameInfo.tribe = loadedInfo.tribe;
  gameInfo.factions = loadedInfo.factions;
};

export const initGameInfo = async (): Promise<void> => {
  const accId = accountService.getCurrentAccount().id;
  const { gameInfo } = AccountContext.getContext();

  if (gameInfo.parsed) {
    return;
  }

  gameInfo.speed = await parseServerSpeed();
  gameInfo.tribe = await parseTribe();
  gameInfo.mapSize = await parseMapSize();
  gameInfo.factions = await parseFactions();
  gameInfo.parsed = true;

  serialize({
    parsed: gameInfo.parsed,
    mapSize: gameInfo.mapSize,
    speed: gameInfo.speed,
    tribe: gameInfo.tribe,
    factions: gameInfo.factions,
  }, accId);

  AccountContext.getContext().logsService.logText(
    `Player info initialized, Tribe: ${Tribe[gameInfo.tribe]}, Speed: ${
      gameInfo.speed
    }x`,
  );
};
