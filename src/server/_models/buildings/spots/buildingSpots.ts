import { BuildingType } from '../../../_enums/buildingType';
import { BuildingSpot } from './buildingSpot';

export class BuildingSpots {
  private readonly m_buildings: Record<number, BuildingSpot> = {};

  constructor() {
    for (let i = 0; i < 40; i++) {
      const fieldId = i + 1;
      this.m_buildings[fieldId] = new BuildingSpot({ fieldId });
    }

    Object.freeze(this.m_buildings);
  }

  public buildings = (): readonly BuildingSpot[] => Object.values(this.m_buildings);

  public at = (fieldId: number): BuildingSpot => this.m_buildings[fieldId];

  public ofType = (type: BuildingType): BuildingSpot | undefined => this.buildings().find(x => x.type === type);

  public isBuilt = (type: BuildingType): boolean => this.buildings().some(b => b.type === type && b.isBuilt());
}
