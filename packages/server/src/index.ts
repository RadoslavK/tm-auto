// @ts-ignore
import makePromisesSafe from 'make-promises-safe';
makePromisesSafe.logError = console.error;
import { schema } from './_api/schema.js';
import { createIpcExecutor } from './_api/utils/createIpcExecutor.js';

const execute = async () => {
  const { socketName } = process.env;

  if (!socketName) {
    throw new Error('Missing socket name');
  }

  process.on('warning', (e) => console.warn(e.stack));

  await createIpcExecutor({
    schema,
    socketName,
  });
};

//  TODO: top level import not supported by esbuild for CJS files yet
//  https://github.com/evanw/esbuild/issues/253
execute();