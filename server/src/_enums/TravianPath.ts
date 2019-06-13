export enum TravianPath {
  ResourceFieldsOverview = 'dorf1.php',
  InfrastructureOverview = 'dorf2.php',

  Player = 'spieler.php',
}

export const getBuildingSpotPath = (fieldId: number) => `build.php?id=${fieldId}`;
