import express from 'express';
import { Account, IAccount } from './models/account';
import { getPage } from './utils/getPage';
import { Controller } from './controller';

const app = express();
const port = 3000;

export const account: IAccount = new Account({
  username: 'Buckyx',
  password: 'Speedas11',
  url: 'https://ts5.travian.com',
});

const controller: Controller = new Controller();

app.post('/start', async (req, res) => {
  controller.start();
  res.status(200).send('Started');
});

app.listen(port, () => console.log(`Listening on port ${port}`));

(async function init() {
  await getPage();
})();
