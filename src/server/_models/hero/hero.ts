import { mergeDefaults } from '../../../_shared/merge';
import { PartialFields } from '../../../_shared/types/fields.type';
import { HeroState } from '../../../_shared/types/heroState';
import { Resources } from '../misc/resources';

// todo rewrite to service
export class Hero {
  public hasAvailableAdventures: boolean = false;
  public health: number = 0;
  // TODO zistit vsetky mozne stavi a jak sa lisia
  public state: HeroState = HeroState.Unknown;
  public villageId: number | null = null;
  public resources: Resources = new Resources();

  constructor(params: PartialFields<Hero> = {}) {
    mergeDefaults(this, params);
  }

  public canGoToAdventure = (): boolean =>
    this.state === HeroState.InVillage && this.hasAvailableAdventures;
}