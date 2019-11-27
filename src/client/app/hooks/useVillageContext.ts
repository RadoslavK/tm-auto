import { useContext } from 'react';

import {
  IVillageContext,
  VillageContext,
} from '../components/villages/context/villageContext';

export const useVillageContext = () => {
  return useContext<IVillageContext>(VillageContext);
};