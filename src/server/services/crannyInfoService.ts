import { Tribe } from '../_models/enums/tribe';
import { getAccountContext } from '../accountContext';

const capacities: Record<number, number> = {
  1: 200,
  10: 2000,
  2: 260,
  3: 340,
  4: 440,
  5: 560,
  6: 720,
  7: 920,
  8: 1200,
  9: 1540,
};

class CrannyInfoService {
  getCapacity = (level: number): number => {
    if (level === 0) {
      return 0;
    }

    const { tribe } = getAccountContext().gameInfo;

    const multiplier = tribe === Tribe.Gauls ? 1.5 : 1;

    return capacities[level] * multiplier;
  };
}

export const crannyInfoService = new CrannyInfoService();
