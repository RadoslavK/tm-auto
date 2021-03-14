import { mergeDefaults } from '../../../../../_shared/merge';
import { PartialFields } from '../../../../../_shared/types/fields.type';
import { CoolDown } from '../../coolDown';
import { Duration } from '../../duration';

export const AdventureCriterias = ['Closest', 'Furthest', 'Random'] as const;
export type AdventureCriteria = typeof AdventureCriterias[number];

export class AutoAdventureSettings {
  public readonly adventureCriteria: AdventureCriteria =
    'Closest';

  public readonly allow: boolean = true;

  public readonly coolDown: CoolDown = new CoolDown({
    max: new Duration({ minutes: 13 }),
    min: new Duration({ minutes: 8 }),
  });

  public readonly hardMinHealth: number = 50;

  public readonly maxTravelTime: Duration = new Duration({ hours: 1 });

  public readonly normalMinHealth: number = 30;

  public readonly preferHard: boolean = false;

  constructor(params: PartialFields<AutoAdventureSettings> = {}) {
    mergeDefaults(this, params);
  }
}
