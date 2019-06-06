import { BuildingsService } from '../services/buildingsService';
import { ControllerService } from '../services/controllerService';
import { UserService } from '../services/userService';
import { VillageService } from '../services/villageService';

export interface IGraphQLContext {
  readonly buildingsService: BuildingsService;
  readonly controllerService: ControllerService;
  readonly userService: UserService;
  readonly villageService: VillageService;
}

export const context: IGraphQLContext = {
  buildingsService: new BuildingsService(),
  controllerService: new ControllerService(),
  userService: new UserService(),
  villageService: new VillageService(),
};
