/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetVillageById
// ====================================================

export interface GetVillageById_village_buildings_level {
  readonly actual: number;
  readonly ongoing: number;
}

export interface GetVillageById_village_buildings {
  readonly type: number;
  readonly level: GetVillageById_village_buildings_level;
}

export interface GetVillageById_village {
  readonly name: string;
  readonly buildings: ReadonlyArray<GetVillageById_village_buildings>;
}

export interface GetVillageById {
  readonly village: GetVillageById_village;
}

export interface GetVillageByIdVariables {
  readonly id: string;
}
