import type { PartialFields } from 'shared/types/fields.type.js';
import { mergeDefaults } from 'shared/utils/merge.js';

export class GeneralSettings {
  public readonly autoStart: boolean = false;

  public readonly chromePath: string =
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe';

  public readonly headlessChrome: boolean = true;

  constructor(params: PartialFields<GeneralSettings> = {}) {
    mergeDefaults(this, params);
  }
}
