export class AutoBuildLogEntryContent {
  public readonly fieldId: number;
  public readonly level: number;
  public readonly name: string;
  public readonly type: number;

  constructor(params: AutoBuildLogEntryContent) {
    Object.assign(this, params);
  }
}