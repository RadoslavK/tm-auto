import type { TabInformation } from '../controller/actions/ensurePage.js';

export enum TravianPath {
  AccountOverview = 'dorf3.php',
  CenterMap = 'karte.php',
  Hero = 'hero',
  InfrastructureOverview = 'dorf2.php',
  Messages = 'messages.php',
  PlayerProfile = 'profile',
  Reports = 'report',
  ResourceFieldsOverview = 'dorf1.php',
  Settings = 'options',
  Statistics = 'statistics',
  Logout = 'logout.php',
}

export const getBuildingSpotPath = (
  fieldId: number,
  tab?: TabInformation,
): string =>
  tab === undefined
    ? `build.php?id=${fieldId}`
    : `build.php?${tab.name}=${tab.index}&id=${fieldId}`;