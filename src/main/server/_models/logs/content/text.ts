import { mergeDefaults } from '../../../../../_shared/merge.js';
import { PartialFields } from '../../../../../_shared/types/fields.type.js';

export enum TextLogEntryType {
  Info = 'Info',
  Error = 'Error'
}

export class TextLogEntryContent {
  public readonly message: string = '';

  public readonly type: TextLogEntryType = TextLogEntryType.Info;

  constructor(params: PartialFields<TextLogEntryContent> = {}) {
    mergeDefaults(this, params);
  }
}
