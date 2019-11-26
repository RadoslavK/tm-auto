import { IHeroState } from '../../_types/graphql';

interface IParams {
  hasAvailableAdventures: boolean;
  health: number;
  state: IHeroState;
  villageId: number | null;
}

export class Hero implements IParams {
  public hasAvailableAdventures: boolean;
  public health = 0;
  // TODO zistit vsetky mozne stavi a jak sa lisia
  public state: IHeroState = IHeroState.Unknown;
  public villageId: number | null = null;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }

  public canGoToAdventure = (): boolean => this.state === IHeroState.InVillage && this.hasAvailableAdventures;
}
