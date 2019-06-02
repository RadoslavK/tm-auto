import { ensureLoggedIn } from './actions/ensureLoggedIn';
import { startBuilding } from './actions/startBuilding';

export class Controller {
  public start = async () => {
    await ensureLoggedIn();

    await this.build();
  };

  public build = async () => {
    log('building...');
    await startBuilding({ fieldId: 6 });

    setTimeout(this.build, 20 * 1000);
    log('gonna build next in 20 seconds');
  };
}

const log = (message: string) => {
  const now = new Date();
  const hours = now.getHours() > 9 ? `${now.getHours()}` : `0${now.getHours()}`;
  const mins = now.getMinutes() > 9 ? `${now.getMinutes()}` : `0${now.getMinutes()}`;
  const sec = now.getSeconds() > 9 ? `${now.getSeconds()}` : `0${now.getSeconds()}`;
  const time = `${hours}:${mins}:${sec}`;
  console.log(`${time}: ${message}`);
};
