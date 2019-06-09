import { Resources } from './resources';

interface IParams {
  resources: Resources;
  freeCrop: number;
}

export class Cost {
  public resources: Resources = new Resources();
  public freeCrop: number = 0;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }

  public add = (addition: Cost): void => {
    this.resources.add(addition.resources);
    this.freeCrop += addition.freeCrop;
  };
}
