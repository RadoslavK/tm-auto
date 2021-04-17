import upgradeInfos from '../../_info/unit-upgrade-costs.json';
import { Resources } from '../../_models/misc/resources.js';

export type UnitLevelCosts = ReadonlyMap<number, Resources>;
export type UnitUpgradeCosts = ReadonlyMap<number, UnitLevelCosts>;

export class UnitUpgradeCostService {
  private _infos: UnitUpgradeCosts | null = null;

  public getUpgradeCost = (uIndex: number, level: number): Resources => {
    const infos = this.infos();
    const cost = infos.get(uIndex)?.get(level);

    if (!cost) {
      throw new Error(`No upgrade cost found for unitIndex: ${uIndex}, level: ${level}`);
    }

    return cost;
  };

  private infos = (): UnitUpgradeCosts => {
    if (this._infos) {
      return this._infos;
    }

    const unitInfos: UnitUpgradeCosts = Object.entries(upgradeInfos).reduce(
      (reducedUnitInfos, [unitIndex, unitLevelCosts]) => {
        const levelCosts: UnitLevelCosts = Object.entries(unitLevelCosts).reduce(
          (reducedLevelCosts, [level, levelCost]) => {
            reducedLevelCosts.set(+level, new Resources(levelCost));
            return reducedLevelCosts;
          },
          new Map<number, Resources>(),
        );

        reducedUnitInfos.set(+unitIndex, levelCosts);

        return reducedUnitInfos;
      },
      new Map<number, UnitLevelCosts>(),
    );

    this._infos = unitInfos;

    return unitInfos;
  };
}

export const unitUpgradeCostService = new UnitUpgradeCostService();