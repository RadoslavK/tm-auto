import { TextLogEntryType } from '../../../../_shared/types/textLogEntryType';

export class TextLogEntryContent {
  public readonly message: string;
  public readonly type: TextLogEntryType;

  constructor(params: TextLogEntryContent) {
    Object.assign(this, params);
  }
}