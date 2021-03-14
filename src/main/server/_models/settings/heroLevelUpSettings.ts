import { mergeDefaults } from '../../../../_shared/merge';
import { PartialFields } from '../../../../_shared/types/fields.type';

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
