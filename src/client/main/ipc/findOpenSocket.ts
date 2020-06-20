import ipc from 'node-ipc';

import { generateId } from '../../../_shared/generateId';

const isSocketTaken = (name: string): Promise<boolean> =>
  new Promise((resolve) => {
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
