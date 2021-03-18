import { mergeDefaults } from '../../../_shared/merge.js';
import { PartialFields } from '../../../_shared/types/fields.type.js';

export class Coords {
  public readonly x: number = 0;

  public readonly y: number = 0;

  constructor(params: PartialFields<Coords> = {}) {
    mergeDefaults(this, params);
  }

  public toString = (): string => `[${this.x}|${this.y}]`;
}
