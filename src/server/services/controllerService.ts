import { Controller } from '../controller';

class ControllerService {
  private controller: Controller = new Controller();

  public get = (): Controller => this.controller;
}

export const controllerService = new ControllerService();