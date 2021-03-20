import type { TabInformation } from '../controller/actions/ensurePage.js';

export enum TravianPath {
  AccountOverview = 'dorf3.php',
  CenterMap = 'karte.php',
  Hero = 'hero.php',
  InfrastructureOverview = 'dorf2.php',
  Messages = 'messages.php',
  PlayerProfile = 'spieler.php',
  Reports = 'berichte.php',
  ResourceFieldsOverview = 'dorf1.php',
  Settings = 'options.php',
  Statistics = 'statistiken.php',
  Logout = 'logout.php',
}

export const getBuildingSpotPath = (
  fieldId: number,
  tab?: TabInformation,
): string =>
  tab === undefined
    ? `build.php?id=${fieldId}`
    : `build.php?${tab.name}=${tab.index}&id=${fieldId}`;
