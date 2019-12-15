import { Tribe } from '../../_shared/types/tribe';
import { accountContext } from '../accountContext';

const capacities: Record<number, number> = {
  1: 200,
  2: 260,
  3: 340,
  4: 440,
  5: 560,
  6: 720,
  7: 920,
  8: 1200,
  9: 1540,
  10: 2000,
};

class CrannyInfoService {
  getCapacity = (level: number): number => {
    const { tribe } = accountContext.gameInfo;

    const multiplier = tribe === Tribe.Gauls
      ? 1.5
      : 1;

    return capacities[level] * multiplier;
  };
}

export const crannyInfoService = new CrannyInfoService();
