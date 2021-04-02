import { atom } from 'recoil';

import { RecoilKeys } from '../keys.js';

export const selectedVillageIdState = atom<string>({
  key: RecoilKeys.SelectedVillageId,
  default: '',
});