import { Player } from '../_models/player';

class PlayerService {
  private player: Player = new Player();

  public get = (): Player => this.player;
}

export const playerService = new PlayerService();