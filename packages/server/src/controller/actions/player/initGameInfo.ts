import type { GameInfo } from '../../../_models/gameInfo.js';
import { AccountContext } from '../../../accountContext.js';
import { parseAccountTribe } from '../../../parsers/gameInfo/parseAccountTribe.js';
import { parseFactions } from '../../../parsers/gameInfo/parseFactions.js';
import { parseMapSize } from '../../../parsers/gameInfo/parseMapSize.js';
import { parseServerSpeed } from '../../../parsers/gameInfo/parseServerSpeed.js';
import { accountService } from '../../../services/accountService.js';
import { activityService } from '../../../services/botActivityService.js';
import { dataPathService } from '../../../services/dataPathService.js';
import { fileService } from '../../../services/fileService.js';

type SerializableGameInfo = Pick<GameInfo, 'parsed' | 'mapSize' | 'accountTribe' | 'speed' | 'factions'>;

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
  gameInfo.accountTribe = loadedInfo.accountTribe;
  gameInfo.speed = loadedInfo.speed;
  gameInfo.factions = loadedInfo.factions;
};

export const initGameInfo = async (): Promise<void> => {
  activityService.setActivity('Initializing game info');
  const accId = accountService.getCurrentAccount().id;
  const { gameInfo } = AccountContext.getContext();

  if (gameInfo.parsed) {
    return;
  }

  gameInfo.speed = await parseServerSpeed();
  gameInfo.mapSize = await parseMapSize();
  gameInfo.accountTribe = await parseAccountTribe();
  gameInfo.factions = await parseFactions();
  gameInfo.parsed = true;

  serialize({
    parsed: gameInfo.parsed,
    mapSize: gameInfo.mapSize,
    accountTribe: gameInfo.accountTribe,
    speed: gameInfo.speed,
    factions: gameInfo.factions,
  }, accId);

  activityService.setActivity('Player info initialized');
};
