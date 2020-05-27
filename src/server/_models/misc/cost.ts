import { mergeDefaults } from '../../../_shared/merge';
import { PartialFields } from '../../../_shared/types/fields.type';
import { Duration } from '../duration';
import { Resources } from './resources';

export class Cost {
  public readonly buildTime: Duration = new Duration();
  public readonly resources: Resources = new Resources();

  constructor(params: PartialFields<Cost> = {}) {
    mergeDefaults(this, params);
  }

  public add = (addition: Cost): Cost => new Cost({
    buildTime: this.buildTime.add(addition.buildTime),
    resources: this.resources.add(addition.resources),
  });
}