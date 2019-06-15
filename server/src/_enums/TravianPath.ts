export enum TravianPath {
  ResourceFieldsOverview = 'dorf1.php',
  InfrastructureOverview = 'dorf2.php',

  Player = 'spieler.php',
  Hero = 'hero.php',
}

export const getBuildingSpotPath = (fieldId: number) => `build.php?id=${fieldId}`;

export const getPath = {
  buildingSpot: (fieldId: number) => `build.php?id=${fieldId}`,
};
