import { atom } from 'recoil';

import type { EnsureGlobalStateGameInfoQueryResponse } from '../../_graphql/__generated__/EnsureGlobalStateGameInfoQuery.graphql.js';

export const TribeStateKey = 'tribe';

export const tribeState = atom<EnsureGlobalStateGameInfoQueryResponse['gameInfo']['tribe']>({
  key: TribeStateKey,
  default: 'Romans',
});