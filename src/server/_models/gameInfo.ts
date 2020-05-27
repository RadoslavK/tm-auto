import { Tribe } from '../../_shared/types/tribe';

//  TODO has gold club feature
export class GameInfo {
  public allyId: number | null = null;
  public speed = 0;
  public tribe: Tribe = Tribe.Romans;
}