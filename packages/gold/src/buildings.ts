import { BuildingType } from 'shared/enums/BuildingType.js';

type BuildingByType = {
  readonly type: BuildingType;
}

type BuildingByFieldId = {
  readonly fieldId: number;
}

export type Building = (BuildingByType | BuildingByFieldId) & {
  readonly level: number;
}

const woodIds: ReadonlyArray<number> = [1, 3, 14, 17];
const clayIds: ReadonlyArray<number> = [5, 6, 16, 18];
const ironIds: ReadonlyArray<number> = [4, 7, 10, 11];
const cropIds: ReadonlyArray<number> = [2, 8, 9, 12, 13, 15];

const wallId = 40;

export const buildingsStage1: ReadonlyArray<Building> = [
  { type: BuildingType.MainBuilding, level: 3 },
  { type: BuildingType.Granary, level: 1 },
  { type: BuildingType.Warehouse, level: 1 },
  { type: BuildingType.Marketplace, level: 1 },
  { type: BuildingType.Embassy, level: 1 },
  { type: BuildingType.Cranny, level: 1 },
  { fieldId: wallId, level: 1 },
  { type: BuildingType.Granary, level: 3 },
  { type: BuildingType.Warehouse, level: 3 },
  //  Clay + Iron 1x2
  { level: 2, fieldId: clayIds[0] },
  { level: 2, fieldId: ironIds[0] },
  //  Crop 6x1 - x2 server needs some free crop at least first
  { level: 1, fieldId: cropIds[1] },
  { level: 1, fieldId: cropIds[2] },
  { level: 1, fieldId: cropIds[3] },
  { level: 1, fieldId: cropIds[4] },
  { level: 1, fieldId: cropIds[5] },
  //  Clay 4x2
  { level: 2, fieldId: clayIds[1] },
  { level: 2, fieldId: clayIds[2] },
  { level: 2, fieldId: clayIds[3] },
  //  Wood 4x2
  { level: 2, fieldId: woodIds[1] },
  { level: 2, fieldId: woodIds[2] },
  { level: 2, fieldId: woodIds[3] },
  //  Iron 4x2
  { level: 2, fieldId: ironIds[1] },
  { level: 2, fieldId: ironIds[2] },
  { level: 2, fieldId: ironIds[3] },
  //  Crop 6x2
  { level: 2, fieldId: cropIds[1] },
  { level: 2, fieldId: cropIds[2] },
  { level: 2, fieldId: cropIds[3] },
  { level: 2, fieldId: cropIds[4] },
  { level: 2, fieldId: cropIds[5] },
  //  MB 7
  { type: BuildingType.MainBuilding, level: 7 },
  { level: 4, fieldId: clayIds[0] },
  { level: 4, fieldId: woodIds[0] },
  { level: 4, fieldId: ironIds[0] },
  { level: 4, fieldId: cropIds[0] },
  { type: BuildingType.Cranny, level: 3 },
  { type: BuildingType.Marketplace, level: 3 },
  { fieldId: wallId, level: 3 },
  { type: BuildingType.Barracks, level: 3 },
  { type: BuildingType.Cranny, level: 4 },
  { type: BuildingType.Academy, level: 1 },
  { type: BuildingType.Cranny, level: 6 },
  //  Clay 4x3
  { level: 3, fieldId: clayIds[1] },
  { level: 3, fieldId: clayIds[2] },
  { level: 3, fieldId: clayIds[3] },
  //  Wood 4x3
  { level: 3, fieldId: woodIds[1] },
  { level: 3, fieldId: woodIds[2] },
  { level: 3, fieldId: woodIds[3] },
  //  Iron 4x3
  { level: 3, fieldId: ironIds[1] },
  { level: 3, fieldId: ironIds[2] },
  { level: 3, fieldId: ironIds[3] },
  //  Crop 6x3
  { level: 3, fieldId: cropIds[1] },
  { level: 3, fieldId: cropIds[2] },
  { level: 3, fieldId: cropIds[3] },
  { level: 3, fieldId: cropIds[4] },
  { level: 3, fieldId: cropIds[5] },
  //  Clay 4x4
  { level: 4, fieldId: clayIds[1] },
  { level: 4, fieldId: clayIds[2] },
  { level: 4, fieldId: clayIds[3] },
  //  Wood 4x4
  { level: 4, fieldId: woodIds[1] },
  { level: 4, fieldId: woodIds[2] },
  { level: 4, fieldId: woodIds[3] },
  { type: BuildingType.Smithy, level: 1 },
  // Cranny 10
  { type: BuildingType.Cranny, level: 10 },
  // Cranny 8x3
  { type: BuildingType.Cranny, level: 3 },
  { type: BuildingType.Cranny, level: 3 },
  { type: BuildingType.Cranny, level: 3 },
  { type: BuildingType.Cranny, level: 3 },
  { type: BuildingType.Cranny, level: 3 },
  { type: BuildingType.Cranny, level: 3 },
  { type: BuildingType.Cranny, level: 3 },
  { type: BuildingType.Cranny, level: 3 },
  { type: BuildingType.Granary, level: 7 },
  { type: BuildingType.Warehouse, level: 7 },
  { type: BuildingType.Academy, level: 7 },
  { type: BuildingType.Residence, level: 1 },
  { type: BuildingType.Academy, level: 10 },
  { type: BuildingType.Workshop, level: 1 },
  { type: BuildingType.Granary, level: 8 },
  { type: BuildingType.Warehouse, level: 8 },
  { type: BuildingType.MainBuilding, level: 10 },
  { type: BuildingType.TownHall, level: 1 },
];

export const buildingsStage2: ReadonlyArray<Building> = [
  { type: BuildingType.Residence, level: 10 },
];