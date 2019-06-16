import { Resources } from './resources';

interface IParams {
  buildTime: number;
  resources: Resources;
}

export class Cost implements IParams {
  public buildTime: number = 0;
  public resources: Resources = new Resources();

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }

  public add = (addition: Cost): void => {
    this.buildTime += addition.buildTime;
    this.resources.add(addition.resources);
  };
}
