import express from 'express';
import { Controller } from '../controller';

const router = express.Router();
const controller: Controller = new Controller();

router.post('/start', async (req, res) => {
  controller.start();
  res.statusCode = 200;
  res.send('Started');
});

router.post('/stop', async (req, res) => {
  controller.stop();
  res.statusCode = 200;
  res.send('Stopped');
});

export { router as bot };
