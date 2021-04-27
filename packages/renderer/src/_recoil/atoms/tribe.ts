import { atom } from 'recoil';
import type { Tribe } from 'shared/enums/Tribe.js';

import { RecoilKeys } from '../keys.js';

export const villageTribeState = atom<keyof typeof Tribe>({
  key: RecoilKeys.VillageTribe,
  default: 'Romans',
});