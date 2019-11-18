export enum HeroState {
  None,
  InVillage,
  Dead,
  Reviving,
  OnAdventure,
}

interface IParams {
  hasAvailableAdventures: boolean;
  health: number;
  state: HeroState;
  villageId: number;
}

export class Hero implements IParams {
  public hasAvailableAdventures: boolean;
  public health = 0;
  public state: HeroState = HeroState.None;
  public villageId = 0;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }

  public canGoToAdventure = (): boolean => this.state === HeroState.InVillage && this.hasAvailableAdventures;
}
