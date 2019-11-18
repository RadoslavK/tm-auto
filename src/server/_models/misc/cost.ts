import { Resources } from './resources';

interface IParams {
  buildTime: number;
  resources: Resources;
}

export class Cost implements IParams {
  public buildTime = 0;
  public resources: Resources = new Resources();

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);

    if (this.resources instanceof Resources) {
      return;
    }

    this.resources = new Resources(this.resources);
  }

  public add = (addition: IParams): Cost => {
    return new Cost({
      buildTime: this.buildTime + addition.buildTime,
      resources: this.resources.add(addition.resources),
    })
  };
}
