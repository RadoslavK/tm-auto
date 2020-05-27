export class AutoUnitsLogEntryContent {
  public readonly amount: number;
  public readonly index: number;
  public readonly tribe: number;
  public readonly unitName: string;

  constructor(params: AutoUnitsLogEntryContent) {
    Object.assign(this, params);
  }
}