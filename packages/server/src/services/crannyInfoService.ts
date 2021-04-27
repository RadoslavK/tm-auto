import { BuildingType } from 'shared/enums/BuildingType.js';
import { Tribe } from 'shared/enums/Tribe.js';

import type { Village } from '../_models/village/village.js';
import { VillageCrannyCapacity as VillageCrannyCapacityModel } from '../_models/village/villageCrannyCapacity.js';

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

export class CrannyInfoService {
  private getCapacityForLevel = (level: number, tribe: Tribe): number => {
    if (level === 0) {
      return 0;
    }

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

    const { tribe } = village;

    return crannies.reduce<VillageCrannyCapacityModel>((capacity, cranny) => {
      const actual = this.getCapacityForLevel(cranny.level.actual, tribe);
      const ongoing = this.getCapacityForLevel(cranny.level.getActualAndOngoing(), tribe);
      const total = this.getCapacityForLevel(cranny.level.getTotal(), tribe);

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