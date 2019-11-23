import { parseServerSpeed } from '../../../parsers/player/parseServerSpeed';
import { parseTribe } from '../../../parsers/player/parseTribe';
import { playerService } from '../../../services/playerService';
import { logsService } from '../../../services/logsService';

export const initPlayerInfo = async (): Promise<void> => {
  const player = playerService.get();
  player.speed = await parseServerSpeed();
  player.tribe = await parseTribe();

  logsService.logText(`Player info initialized, Tribe: ${player.tribe}, Speed: ${player.speed}x`);
};
