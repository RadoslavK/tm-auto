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

export const getBuildingSpotPath = (fieldId: number): string => `build.php?id=${fieldId}`;

export const getPath = {
  buildingSpot: (fieldId: number) => `build.php?id=${fieldId}`,
};
