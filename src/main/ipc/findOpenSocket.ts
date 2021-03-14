import { IPC } from 'node-ipc';

import { generateId } from '../../_shared/generateId';

const isSocketTaken = (name: string): Promise<boolean> =>
  new Promise((resolve) => {
    const ipc = new IPC();
    ipc.config.stopRetrying = true;
    ipc.config.silent = true;

    ipc.connectTo(name, () => {
      ipc.of[name].on('error', () => {
        ipc.disconnect(name);
        resolve(false);
      });

      ipc.of[name].on('connect', () => {
        ipc.disconnect(name);
        resolve(true);
      });
    });
  });

export const findOpenSocket = async (namePrefix: string): Promise<string> => {
  let socketName: string;

  do {
    socketName = `${namePrefix}_${generateId()}`;
  } while (await isSocketTaken(socketName));

  return socketName;
};
