import { mergeDefaults } from '../../../../../../_shared/merge.js';
import { PartialFields } from '../../../../../../_shared/types/fields.type.js';

class AutoStorageOptionSettings {
  public readonly allow: boolean = false;

  public readonly overflowLevel: number = 95;

  constructor(params: PartialFields<AutoStorageOptionSettings> = {}) {
    mergeDefaults(this, params);
  }
}

export class AutoStorageSettings {
  public readonly allowFreeSpots: boolean = false;

  public readonly granary: AutoStorageOptionSettings = new AutoStorageOptionSettings();

  public readonly warehouse: AutoStorageOptionSettings = new AutoStorageOptionSettings();

  constructor(params: PartialFields<AutoStorageSettings> = {}) {
    mergeDefaults(this, params);
  }
}
