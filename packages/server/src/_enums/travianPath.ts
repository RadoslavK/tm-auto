import type { BuildingType } from 'shared/enums/BuildingType.js';

import type { TabInformation } from '../controller/actions/ensurePage.js';

export enum TravianPath {
  AccountOverview = 'village/statistics',
  CenterMap = 'karte.php',
  Hero = 'hero',
  InfrastructureOverview = 'dorf2.php',
  Messages = 'messages',
  PlayerProfile = 'profile',
  Reports = 'report',
  ResourceFieldsOverview = 'dorf1.php',
  Settings = 'options',
  Statistics = 'statistics',
  Logout = 'logout.php',
}

export const getBuildingSpotPath = (
  fieldId: number,
  buildingType?: BuildingType,
  tab?: TabInformation,
): string =>
  tab === undefined
    ? `build.php?id=${fieldId}`
    : `build.php?id=${fieldId}&gid=${buildingType}&${tab.name}=${tab.index}`;
