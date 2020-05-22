import { ICost } from '../../_types/graphql';
import { merge } from '../../../_shared/merge';
import { Fields } from '../../../_shared/types';
import { Duration } from '../duration';
import { Resources } from './resources';

const getDefaults = (): Fields<Cost> => ({
  buildTime: new Duration(),
  resources: new Resources(),
});

export class Cost implements ICost {
  public buildTime: Duration;
  public resources: Resources;

  constructor(params: Partial<ICost> = {}) {
    Object.assign(this, merge(getDefaults, {
      ...params,
      buildTime: params.buildTime && new Duration(params.buildTime),
      resources: params.resources && new Resources(params.resources),
    }));
  }

  public add = (addition: Cost): Cost => new Cost({
    buildTime: this.buildTime.add(addition.buildTime),
    resources: this.resources.add(addition.resources),
  });
}
