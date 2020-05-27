export class TextLogEntryContent {
  public readonly message: string;

  constructor(params: TextLogEntryContent) {
    Object.assign(this, params);
  }
}