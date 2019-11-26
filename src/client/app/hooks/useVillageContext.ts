import { useContext } from 'react';
import {
  IVillageContext,
  VillageContext,
} from '../components/villages/context/VillageContext';

export const useVillageContext = () => {
  return useContext<IVillageContext>(VillageContext);
};