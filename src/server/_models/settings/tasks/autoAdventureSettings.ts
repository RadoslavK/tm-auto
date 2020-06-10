import { mergeDefaults } from '../../../../_shared/merge';
import { AdventureCriteria } from '../../../../_shared/types/adventureCriteria';
import { PartialFields } from '../../../../_shared/types/fields.type';
import { CoolDown } from '../../coolDown';
import { Duration } from '../../duration';

export class AutoAdventureSettings {
  public readonly adventureCriteria: AdventureCriteria = AdventureCriteria.Closest;

  public readonly allow: boolean = true;

  public readonly coolDown: CoolDown = new CoolDown({
    max: new Duration({ minutes: 13 }),
    min: new Duration({ minutes: 8 }),
  });

  public readonly hardMinHealth: number = 50;

  public readonly maxTravelTime: Duration = new Duration({ hours: 1 });

  public readonly normalMinHealth: number = 30;

  public readonly preferHard: boolean = false;

  public readonly preferredVillageId: string | null = null;

  constructor(params: PartialFields<AutoAdventureSettings> = {}) {
    mergeDefaults(this, params);
  }
}