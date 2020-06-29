import { Tribe } from './enums/tribe';

export class GameInfo {
  public allyId: number | null = null;

  public speed = 0;

  public tribe: Tribe = Tribe.Romans;

  public ajaxToken: string = '';

  public mapSize: number = 200;
}
