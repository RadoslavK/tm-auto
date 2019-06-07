import { Player } from '../_models/player';
import { BuildingsService } from '../services/buildingsService';
import { ControllerService } from '../services/controllerService';
import { UserService } from '../services/userService';
import { VillageService } from '../services/villageService';

export interface IGraphQLContext {
  readonly buildingsService: BuildingsService;
  readonly controllerService: ControllerService;
  readonly userService: UserService;
  readonly villageService: VillageService;

  readonly player: Player;
}

export const context: IGraphQLContext = {
  buildingsService: new BuildingsService(),
  controllerService: new ControllerService(),
  userService: new UserService(),
  villageService: new VillageService(),

  player: new Player(),
};
