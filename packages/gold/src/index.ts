import { ensureBonusProduction } from './actions/ensureBonusProduction.js';
import { controller } from './controller.js';
import { signInManager } from './signInManager.js';

const execute = async () => {
  await signInManager.signIn();
  await ensureBonusProduction();
  await controller.execute(true);
};

execute();