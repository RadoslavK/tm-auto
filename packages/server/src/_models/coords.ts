import type { Coords as CoordsModel } from 'shared/types/coords.js';
import type { PartialFields } from 'shared/types/fields.type.js';
import { mergeDefaults } from 'shared/utils/merge.js';

export class Coords implements CoordsModel {
  public readonly x: number = 0;
  public readonly y: number = 0;

  constructor(params: PartialFields<Coords> = {}) {
    mergeDefaults(this, params);
  }

  public toString = (): string => `[${this.x}|${this.y}]`;
}
