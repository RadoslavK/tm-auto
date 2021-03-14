import { mergeDefaults } from '../../../../../../_shared/merge';
import { PartialFields } from '../../../../../../_shared/types/fields.type';
import { CoolDown } from '../../../coolDown';
import { Duration } from '../../../duration';
import { AutoStorageSettings } from './autoStorageSettings';

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
