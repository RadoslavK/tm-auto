import { Resources } from './resources';

interface IParams {
  resources: Resources;
  freeCrop: number;
}

export class Cost implements IParams {
  resources: Resources = new Resources();
  freeCrop: number = 0;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }

  public add(addition: Cost) {
    this.resources.add(addition.resources);
    this.freeCrop += addition.freeCrop;
  }
}
