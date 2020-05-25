import { BuildingType } from '../../../../_shared/types/buildingType';

type Params = {
  readonly fieldId: number;
  readonly finishedAt: Date;
  readonly level: number;
  readonly type: BuildingType;
};

export class BuildingInProgress implements Params {
  public readonly fieldId: number = 0;
  public readonly level: number = 0;
  public readonly finishedAt: Date = new Date();
  public readonly type: BuildingType = BuildingType.None;

  constructor(params: Partial<Params> = {}) {
    Object.assign(this, params);
  }
}
