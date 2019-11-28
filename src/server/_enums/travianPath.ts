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

export const getBuildingSpotPath = (fieldId: number, tabIndex: number | undefined = undefined): string =>
  tabIndex === undefined
    ? `build.php?id=${fieldId}`
    : `build.php?s=${tabIndex}&id=${fieldId}`;

export const getPath = {
  buildingSpot: (fieldId: number) => `build.php?id=${fieldId}`,
};
