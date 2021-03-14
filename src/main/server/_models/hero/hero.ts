import { mergeDefaults } from '../../../../_shared/merge';
import { PartialFields } from '../../../../_shared/types/fields.type';
import { Resources } from '../misc/resources';

export enum HeroState {
  Unknown = 'Unknown',
  InVillage = 'InVillage',
  Dead = 'Dead',
  Reviving = 'Reviving',
  OnAdventure = 'OnAdventure'
}

export class Hero {
  public hasAvailableAdventures: boolean = false;

  public health: number = 0;

  public state: HeroState = HeroState.Unknown;

  public villageId: string | null = null;

  public resources: Resources = new Resources();

  public hasHorseInInventory: boolean = false;

  constructor(params: PartialFields<Hero> = {}) {
    mergeDefaults(this, params);
  }

  public canGoToAdventure = (): boolean =>
    this.state === HeroState.InVillage && this.hasAvailableAdventures;
}
