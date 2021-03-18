import { mergeDefaults } from '../../../../_shared/merge.js';
import { PartialFields } from '../../../../_shared/types/fields.type.js';

type HeroLevelUpItem = {
  readonly name: string;
  readonly offensiveStrength: number;
  readonly offBonus: number;
  readonly defBonus: number;
  readonly resources: number;
};

export class HeroLevelUpSettings {
  public readonly levelUpItems: readonly HeroLevelUpItem[] = [];

  constructor(params: PartialFields<HeroLevelUpSettings> = {}) {
    mergeDefaults(this, params);
  }
}
