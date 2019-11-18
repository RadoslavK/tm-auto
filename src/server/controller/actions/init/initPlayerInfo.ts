import { parseServerSpeed } from '../../../parsers/player/parseServerSpeed';
import { parseTribe } from '../../../parsers/player/parseTribe';
import { playerService } from '../../../services/playerService';

export const initPlayerInfo = async (): Promise<void> => {
  playerService.get().speed = await parseServerSpeed();
  playerService.get().tribe = await parseTribe();
};
