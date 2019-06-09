import { Controller } from '../controller';

export class ControllerService {
  private readonly _controller: Controller = new Controller();

  public isRunning: boolean = false;

  public start = async (): Promise<void> => {
    this.isRunning = true;
    await this._controller.start();
  };

  public stop = async (): Promise<void> => {
    this.isRunning = false;
    await this._controller.stop();
  };
}
