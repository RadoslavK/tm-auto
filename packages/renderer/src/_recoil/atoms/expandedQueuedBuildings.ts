import { atom } from 'recoil';

import { RecoilKeys } from '../keys.js';

type State = ReadonlyMap<string, ReadonlySet<string>>;

export const expandedQueuedBuildingsState = atom<State>({
  key: RecoilKeys.ExpandedQueuedBuildings,
  default: new Map<string, ReadonlySet<string>>(),
});