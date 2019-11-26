import fs from "fs";
import path from "path";
import { BuildingCategory } from '../_enums/BuildingCategory';
import { IBuildingConditions } from '../_models/buildings/buildingConditions';
import { Cost } from '../_models/misc/cost';
import { BuildingType } from '../_enums/BuildingType';
import { ITribe } from '../_types/graphql';
import { mapRecord } from '../../_shared/objectUtils';

//  TODO nejaky resource loader

const unitsInfoPath = path.join(__dirname, '..', '..', '..', 'resources', 'unit-infos.json');
const buildingsInfoPath = path.join(__dirname, '..', '..', '..', 'resources', 'building-infos.json');

export const unitInfos: Map<number, IUnitInfo> = new Map();
export const buildingInfos: Map<BuildingType, IBuildingInfo> = new Map();

export interface IBuildingInfo {
  readonly category: BuildingCategory;
  readonly conditions: IBuildingConditions;
  readonly costs: Record<string, Cost>;
  readonly maxLevel: number;
  readonly name: string;
}

export interface IUnitInfo {
  readonly buildingType: BuildingType;
  readonly cost: Cost;
  readonly name: string;
  readonly tribe: ITribe;
}

export const loadInfo = (): void => {
  const loadedIUnitInfos = JSON.parse(fs.readFileSync(unitsInfoPath).toString()) as Record<string, IUnitInfo>;

  Object
    .entries(loadedIUnitInfos)
    .forEach(([key, value]) => {
      //  internally there are not classes so we need to create them
      const correctValue: IUnitInfo = {
        ...value,
        cost: new Cost(value.cost),
      };

      unitInfos.set(+key, correctValue);
    });

  const loadedBuildingInfos = JSON.parse(fs.readFileSync(buildingsInfoPath).toString()) as Record<string, IBuildingInfo>;

  Object
    .entries(loadedBuildingInfos)
    .forEach(([key, value]) => {
      //  correct classes
      const buildingInfo: IBuildingInfo = {
        ...value,
        costs: mapRecord(value.costs, c => new Cost(c)),
      };

      buildingInfos.set(+key, buildingInfo);
    });
};