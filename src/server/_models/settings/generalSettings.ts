import path from 'path';

import { mergeDefaults } from '../../../_shared/merge';
import { PartialFields } from '../../../_shared/types/fields.type';
import { getServerAppDirectory } from '../../utils/getServerAppDirectory';

export class GeneralSettings {
  public readonly dataPath: string = path.join(
    getServerAppDirectory(),
    '.data',
  );

  public readonly chromePath: string =
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe';

  public readonly headlessChrome: boolean = true;

  constructor(params: PartialFields<GeneralSettings> = {}) {
    mergeDefaults(this, params);
  }
}
