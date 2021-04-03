import { BuildingType } from 'shared/enums/BuildingType.js';

import { Tribe } from '../_models/enums/tribe.js';
import type { Village } from '../_models/village/village.js';
import { VillageCrannyCapacity as VillageCrannyCapacityModel } from '../_models/village/villageCrannyCapacity.js';
import { AccountContext } from '../accountContext.js';

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

export class CrannyInfoService {
  private getCapacityForLevel = (level: number): number => {
    if (level === 0) {
      return 0;
    }

    const { tribe } = AccountContext.getContext().gameInfo;

    const multiplier = tribe === Tribe.Gauls ? 1.5 : 1;

    return capacities[level] * multiplier;
  };

  public getCapacity = (village: Village) => {
    const crannies = village
      .buildings.spots.buildings()
      .filter((s) => s.type === BuildingType.Cranny);

    const emptyCapacity = new VillageCrannyCapacityModel();

    if (!crannies.length) {
      return emptyCapacity;
    }

    return crannies.reduce<VillageCrannyCapacityModel>((capacity, cranny) => {
      const actual = this.getCapacityForLevel(cranny.level.actual);
      const ongoing = this.getCapacityForLevel(cranny.level.getActualAndOngoing());
      const total = this.getCapacityForLevel(cranny.level.getTotal());

      return capacity.add(
        new VillageCrannyCapacityModel({
          actual,
          ongoing,
          total,
        }),
      );
    }, emptyCapacity);
  };
}