import { villagesService } from '../services/villageService';

export const updateUnitsInformation = async (): Promise<void> => {
  const village = villagesService.get().village();

  for (let i = 1; i <= 10; i++) {
    village.units.setCount(i, 0);
  }
};
