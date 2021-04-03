import type { PartialFields } from 'shared/types/fields.type.js';
import { mergeDefaults } from 'shared/utils/merge.js';

export class Timestamp {
  public readonly totalSeconds: number = 0;

  constructor(params: PartialFields<Timestamp> = {}) {
    mergeDefaults(this, params);
  }

  static fromDate = (date: Date): Timestamp => ({
    totalSeconds: Math.floor(date.getTime() / 1000),
  });
}
