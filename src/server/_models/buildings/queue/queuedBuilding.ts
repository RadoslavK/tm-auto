import { BuildingType } from '../../../../_shared/types/buildingType';

type Params = {
  readonly fieldId: number;
  readonly level: number;
  readonly queueId: string;
  readonly type: BuildingType;
};

export class QueuedBuilding implements Params {
  public readonly fieldId: number = 0;
  public readonly level: number = 0;
  public readonly type: BuildingType = BuildingType.None;
  public readonly queueId: string = '';

  constructor(params: Partial<Params> = {}) {
    Object.assign(this, params);
  }
}
