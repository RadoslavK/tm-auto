import type { PartialFields } from 'shared/types/fields.type.js';
import { mergeDefaults } from 'shared/utils/merge.js';

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
