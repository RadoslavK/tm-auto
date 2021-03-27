import { mergeDefaults } from 'shared/utils/merge.js';
import type { PartialFields } from 'shared/types/fields.type.js';
import { Resources } from '../misc/resources.js';

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