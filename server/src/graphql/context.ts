import { Player } from '../_models/player';
import { Villages } from '../_models/village/villages';
import { Controller } from '../controller';
import { User } from '../_models/user';

export const context = {
  controller: new Controller(),
  player: new Player(),
  user: new User(),
  villages: new Villages(),
};
