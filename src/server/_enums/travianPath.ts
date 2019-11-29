import { ITabInformation } from '../controller/actions/ensurePage';

export enum TravianPath {
  ResourceFieldsOverview = 'dorf1.php',
  InfrastructureOverview = 'dorf2.php',
  AccountOverview = 'dorf3.php',

  CenterMap = 'karte.php',

  Statistics = 'statistiken.php',

  Reports = 'berichte.php',

  Messages = 'messages.php',

  PlayerProfile = 'spieler.php',

  Hero = 'hero.php',
}

export const getBuildingSpotPath = (fieldId: number, tab: ITabInformation | undefined = undefined): string =>
  tab === undefined
    ? `build.php?id=${fieldId}`
    : `build.php?${tab.name}=${tab.index}&id=${fieldId}`;
