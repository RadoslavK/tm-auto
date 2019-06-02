import express from 'express';
import cors from 'cors';
import path from 'path';
import { Account, IAccount } from './models/account';
import { Controller } from './controller';

const app = express();
const port = 3000;
const clientPath = path.join(__dirname, '..', '..', 'client/dist');

app.use(cors());
app.use(express.static(clientPath));

export const account: IAccount = new Account({
  username: 'Buckyx',
  password: 'Speedas11',
  url: 'https://ts5.travian.com',
});

const controller: Controller = new Controller();

app.get('', (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

app.post('/start', async (req, res) => {
  controller.start();
  res.statusCode = 200;
  res.send('Started');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
