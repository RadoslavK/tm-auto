import fs from "fs";
import path from "path";
import { BuildingCategory } from '../_enums/BuildingCategory';
import { BuildingConditions } from '../_models/buildings/buildingConditions';
import { Cost } from '../_models/misc/cost';
import { BuildingType } from '../_enums/BuildingType';
import { Tribe } from '../_enums/Tribe';

const unitsInfoPath = path.join(__dirname, '..', '..', '..', 'resources', 'unitsInfo.json');
const buildingsInfoPath = path.join(__dirname, '..', '..', '..', 'resources', 'buildingsInfo.json');

export const unitInfos: Record<string, IUnitInfo> = {};
export const buildingInfos: Record<string, IBuildingInfo> = {};

interface IBuildingInfo {
  readonly category: BuildingCategory;
  readonly conditions: BuildingConditions;
  readonly costs: Record<string, Cost>;
  readonly maxLevel: number;
  readonly name: string;
}

class BuildingInfo implements IBuildingInfo {
  readonly category: BuildingCategory;
  readonly conditions: BuildingConditions;
  readonly costs: Record<string, Cost>;
  readonly maxLevel: number;
  readonly name: string;

  constructor(params: IBuildingInfo) {
    Object.assign(this, params);

    if (!(this.conditions instanceof BuildingConditions)) {
      this.conditions = new BuildingConditions(this.conditions);
    }

    const costsByLevel = Object.keys(this.costs);
    const zeroLevelCost = this.costs[costsByLevel[0]];

    if (costsByLevel.length && !(zeroLevelCost instanceof Cost)) {
      this.costs = costsByLevel.reduce((reduced, level) => {
        const cost = this.costs[level];

        return {
          ...reduced,
          [level]: new Cost(cost),
        };
      }, {} as Record<string, Cost>);
    }
  }
}

export interface IUnitInfo {
  readonly buildingType: BuildingType;
  readonly cost: Cost;
  readonly name: string;
  readonly tribe: Tribe;
}

export const loadInfo = (): void => {
  const loadedIUnitInfos = JSON.parse(fs.readFileSync(unitsInfoPath).toString()) as typeof unitInfos;

  Object
    .entries(loadedIUnitInfos)
    .forEach(([key, value]) => {
      unitInfos[key] = value;
    });

  const bInfos = JSON.parse(fs.readFileSync(buildingsInfoPath).toString());
  const loadedBuildingInfos = Object
    .keys(bInfos)
    .reduce((reduced, bType) => {
      const buildingInfo = bInfos[bType];

      return {
        ...reduced,
        [bType]: new BuildingInfo(buildingInfo),
      };
    }, {} as Record<string, IBuildingInfo>);

  Object
    .entries(loadedBuildingInfos)
    .forEach(([key, value]) => {
      buildingInfos[key] = value;
    });
};