import type { PartialFields } from 'shared/types/fields.type.js';
import { mergeDefaults } from 'shared/utils/merge.js';

import { CoolDown } from '../../../coolDown.js';
import { Duration } from '../../../duration.js';
import { AutoStorageSettings } from './autoStorageSettings.js';

type DualQueueSettings = {
  readonly allow: boolean;
  readonly preference: DualQueuePreference;
};

export const DualQueuePreferences = ['Resources', 'Infrastructure'] as const;
export type DualQueuePreference = typeof DualQueuePreferences[number];

export class AutoBuildSettings {
  readonly allow: boolean = true;

  readonly dualQueue: DualQueueSettings = {
    allow: true,
    preference: 'Resources',
  };

  readonly coolDown: CoolDown = new CoolDown({
    max: new Duration({ minutes: 7 }),
    min: new Duration({ minutes: 4 }),
  });

  readonly autoCropFields: boolean = false;

  readonly minCrop: number = 0;

  readonly useHeroResources: boolean = false;

  readonly autoStorage: AutoStorageSettings = new AutoStorageSettings();

  constructor(params: PartialFields<AutoBuildSettings> = {}) {
    mergeDefaults(this, params);
  }
}
