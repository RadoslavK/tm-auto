import { Resources } from './resources';

interface IParams {
  buildingTime: number;
  resources: Resources;
}

export class Cost implements IParams {
  public buildingTime: number = 0;
  public resources: Resources = new Resources();

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }

  public add = (addition: Cost): void => {
    this.buildingTime += addition.buildingTime;
    this.resources.add(addition.resources);
  };
}
