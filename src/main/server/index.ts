// TODO do we need this? Add proper source maps everywhere
// import 'source-map-support/register';
// @ts-ignore
// import makePromisesSafe from 'make-promises-safe';
// makePromisesSafe.logError = console.error;
import { schema } from './_api/schema.js';

import { createIpcExecutor } from './_api/utils/createIpcExecutor.js';

const { socketName } = process.env;

if (!socketName) {
  throw new Error('Missing socket name');
}

process.on('warning', (e) => console.warn(e.stack));

await createIpcExecutor({
  schema,
  socketName,
});
