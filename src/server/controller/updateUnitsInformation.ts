import { accountContext } from '../accountContext';

export const updateUnitsInformation = async (): Promise<void> => {
  const village = accountContext.villageService.currentVillage();

  for (let i = 1; i <= 10; i++) {
    village.units.setCount(i, 0);
  }
};
