interface ICoords {
  readonly x: number;
  readonly y: number;
}

interface IParams {
  coords: ICoords;
  id: number;
  name: string;
}

export class Village implements IParams {
  coords: ICoords = { x: 0, y: 0 };
  id: number = 0;
  name: string = '';

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
