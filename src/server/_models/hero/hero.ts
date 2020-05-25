import { HeroState } from '../../_types/graphql';

type Params = {
  hasAvailableAdventures: boolean;
  health: number;
  state: HeroState;
  villageId: number | null;
};

export class Hero implements Params {
  public hasAvailableAdventures: boolean;
  public health = 0;
  // TODO zistit vsetky mozne stavi a jak sa lisia
  public state: HeroState = HeroState.Unknown;
  public villageId: number | null = null;

  constructor(params: Partial<Params> = {}) {
    Object.assign(this, params);
  }

  public canGoToAdventure = (): boolean => this.state === HeroState.InVillage && this.hasAvailableAdventures;
}
