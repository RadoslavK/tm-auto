import { BuildingType } from '../../../_enums/BuildingType';

interface IParams {
  readonly fieldId: number;
  readonly level: number;
  readonly type: BuildingType;
  readonly queueId: string;
}

export class QueuedBuilding implements IParams {
  public readonly fieldId: number = 0;
  public readonly level: number = 0;
  public readonly type: BuildingType = BuildingType.None;
  public readonly queueId: string = '';

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
