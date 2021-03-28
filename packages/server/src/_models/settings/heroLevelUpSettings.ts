import { mergeDefaults } from 'shared/utils/merge.js';
import type { PartialFields } from 'shared/types/fields.type.js';

type HeroLevelUpItem = {
  readonly id: string;
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
