import { BuildingType } from '../../../../_shared/types/buildingType';

interface IParams {
  readonly fieldId: number;
  readonly finishedAt: Date;
  readonly level: number;
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
