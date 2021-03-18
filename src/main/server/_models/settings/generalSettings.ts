import { mergeDefaults } from '../../../../_shared/merge.js';
import { PartialFields } from '../../../../_shared/types/fields.type.js';

export class GeneralSettings {
  public readonly chromePath: string =
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe';

  public readonly headlessChrome: boolean = true;

  constructor(params: PartialFields<GeneralSettings> = {}) {
    mergeDefaults(this, params);
  }
}
