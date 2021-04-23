import { atom } from 'recoil';

import { RecoilKeys } from '../keys.js';

export const alwaysAddNewToTopState = atom<boolean>({
  key: RecoilKeys.AlwaysAddToTop,
  default: false,
});