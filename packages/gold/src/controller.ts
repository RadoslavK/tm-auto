import { Duration } from 'server/_models/duration.js';

import { handleError } from './actions/handleError.js';
import { buildingManager } from './buildingManager.js';
import {
  buildingsStage1,
  buildingsStage2,
} from './buildings.js';
import { partyManager } from './partyManager.js';
import { settlersManager } from './settlersManager.js';

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

class Controller {
  private stage: number = 0;

  public execute = async (postponeExecution = false): Promise<void> => {
    if (!postponeExecution) {
      await this.executeByStage();
    }

    const delay = this.getDelayByStage().getTotalSeconds();
    const randomDelay = random(delay / 1.5, delay * 1.5);

    global.setTimeout(async () => {
      let errorCounter = 0;
      try {
        await this.execute();
      } catch (error) {
        handleError(error);
        errorCounter++;

        if (errorCounter >= 3) {
          throw error;
        }
      }
    }, randomDelay * 1000);
  };

  private getDelayByStage = (): Duration => {
    switch (this.stage) {
      case 0:
        return new Duration();

      case 1:
        return new Duration({ minutes: 1 });

      case 2:
      case 3:
        return new Duration({ minutes: 5 });

      case 4:
      case 5:
      case 6:
        return new Duration({ minutes: 10 });

      default:
        throw new Error(`Unknown stage ${this.stage}`);
    }
  };

  private executeByStage = async (): Promise<void> => {
    switch (this.stage) {
      case 0:
        //  TODO create a correct stage;
      case 1:
        await buildingManager.build(buildingsStage1);
        break;

      case 2:
      case 5:
        await partyManager.holdParty();
        break;

      case 3:
        await buildingManager.build(buildingsStage2);
        break;

      case 4:
        await settlersManager.buildSettlers();
        break;

      case 6:
        await settlersManager.settleNewVillage();
        break;

      default:
        throw new Error(`Unknown stage ${this.stage}`);

      // Delete acc
      //  Extend BP
    }
  };
}

export const controller = new Controller();