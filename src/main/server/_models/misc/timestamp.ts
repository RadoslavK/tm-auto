import { mergeDefaults } from '../../../../_shared/merge';
import { PartialFields } from '../../../../_shared/types/fields.type';

export class Timestamp {
  public readonly totalSeconds: number = 0;

  constructor(params: PartialFields<Timestamp> = {}) {
    mergeDefaults(this, params);
  }

  static fromDate = (date: Date): Timestamp => ({
    totalSeconds: Math.floor(date.getTime() / 1000),
  });
}
