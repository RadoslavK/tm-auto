import { useContext } from 'react';

import {
  IVillageContext,
  VillageContext,
} from '../applications/villages/context/villageContext';

export const useVillageContext = (): IVillageContext => useContext<IVillageContext>(VillageContext);