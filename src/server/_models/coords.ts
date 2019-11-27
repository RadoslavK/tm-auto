import { ICoords } from '../_types/graphql';
import { merge } from '../../_shared/merge';
import { Fields } from '../../_shared/types';

const defaults: Fields<Coords> = {
  x: 0,
  y: 0,
};

export class Coords implements ICoords {
  public x: number;
  public y: number;

  constructor(params: Partial<ICoords> = {}) {
    Object.assign(this, merge(defaults, params));
  }

  public toString = (): string => `[${this.x}|${this.y}]`;
}
