import { Controller } from '../controller';

export class ControllerService {
  private readonly _controller: Controller = new Controller();

  public isRunning: boolean = false;

  public async start(): Promise<void> {
    this.isRunning = true;
    await this._controller.start();
  }

  public async stop(): Promise<void> {
    this.isRunning = false;
    await this._controller.stop();
  }
}
