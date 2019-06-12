import { context } from '../../../graphql/context';
import { parseServerSpeed } from '../../../parsers/player/parseServerSpeed';
import { parseTribe } from '../../../parsers/player/parseTribe';

export const initPlayerInfo = async (): Promise<void> => {
  context.player.speed = await parseServerSpeed();
  context.player.tribe = await parseTribe();
};
