import { BuildingType } from '../../../_enums/BuildingType';

interface IParams {
  readonly fieldId: number;
  readonly level: number;
  readonly finishedAt: Date;
  readonly type: BuildingType;
}

export class BuildingInProgress implements IParams {
  public readonly fieldId: number = 0;
  public readonly level: number = 0;
  public readonly finishedAt: Date = new Date();
  public readonly type: BuildingType = BuildingType.None;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
