import { AccountContext } from '../../../accountContext.js';
import { parseGameToken } from '../../../parsers/gameInfo/parseGameToken.js';

export const updateToken = async (): Promise<void> => {
  AccountContext.getContext().gameInfo.token = await parseGameToken();
};