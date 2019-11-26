import { Resources } from './resources';
import { ICost } from '../../_types/graphql';
import { Fields } from '../../../_shared/types';
import { Duration } from '../duration';
import { merge } from '../../../_shared/merge';

const defaults: Fields<Cost> = {
  buildTime: new Duration(),
  resources: new Resources(),
};

export class Cost implements ICost {
  public buildTime: Duration;
  public resources: Resources;

  constructor(params: Partial<ICost> = {}) {
    Object.assign(this, merge(defaults, {
      ...params,
      buildTime: params.buildTime && new Duration(params.buildTime),
      resources: params.resources && new Resources(params.resources),
    }));
  }

  public add = (addition: Cost): Cost => {
    return new Cost({
      buildTime: this.buildTime.add(addition.buildTime),
      resources: this.resources.add(addition.resources),
    });
  };
}
