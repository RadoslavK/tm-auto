import { Tribe } from '../../enums/tribe';

export class AutoUnitsLogEntryContent {
  public readonly amount: number = 0;

  public readonly index: number = 0;

  public readonly tribe: Tribe = Tribe.Romans;

  public readonly unitName: string = '';

  constructor(params: AutoUnitsLogEntryContent) {
    Object.assign(this, params);
  }
}