import { mergeDefaults } from 'shared/utils/merge.js';
import type { PartialFields } from 'shared/types/fields.type.js';

export class GeneralSettings {
  public readonly chromePath: string =
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe';

  public readonly headlessChrome: boolean = true;

  constructor(params: PartialFields<GeneralSettings> = {}) {
    mergeDefaults(this, params);
  }
}
