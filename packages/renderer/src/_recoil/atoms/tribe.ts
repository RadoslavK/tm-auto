import { atom } from 'recoil';

import type { EnsureGlobalStateGameInfoQueryResponse } from '../../_graphql/__generated__/EnsureGlobalStateGameInfoQuery.graphql.js';
import { RecoilKeys } from '../keys.js';

export const tribeState = atom<EnsureGlobalStateGameInfoQueryResponse['gameInfo']['tribe']>({
  key: RecoilKeys.Tribe,
  default: 'Romans',
});