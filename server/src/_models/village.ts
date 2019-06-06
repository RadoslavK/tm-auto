interface IParams {
  id: number;
  name: string;
}

export class Village implements IParams {
  id: number = 0;
  name: string = '';

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
