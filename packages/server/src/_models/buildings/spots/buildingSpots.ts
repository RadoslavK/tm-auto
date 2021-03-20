import type { BuildingType } from 'shared/enums/BuildingType.js';
import { BuildingSpot } from './buildingSpot.js';

export class BuildingSpots {
  private readonly _buildings: Record<number, BuildingSpot> = {};

  constructor() {
    for (let i = 0; i < 40; i++) {
      const fieldId = i + 1;
      this._buildings[fieldId] = new BuildingSpot({ fieldId });
    }

    Object.freeze(this._buildings);
  }

  public buildings = (): readonly BuildingSpot[] =>
    Object.values(this._buildings);

  public at = (fieldId: number): BuildingSpot => this._buildings[fieldId];

  public ofType = (type: BuildingType): BuildingSpot | undefined =>
    this.buildings().find((x) => x.type === type);

  public isBuilt = (type: BuildingType): boolean =>
    this.buildings().some((b) => b.type === type && b.isBuilt());
}
