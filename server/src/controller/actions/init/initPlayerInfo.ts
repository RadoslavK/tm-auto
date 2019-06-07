import { Page } from 'puppeteer';
import { context } from '../../../graphql/context';
import { parseServerSpeed } from '../../../parsers/player/parseServerSpeed';
import { parseTribe } from '../../../parsers/player/parseTribe';

export const initPlayerInfo = async (page: Page): Promise<void> => {
  context.player.speed = await parseServerSpeed(page);
  context.player.tribe = await parseTribe(page);
};
