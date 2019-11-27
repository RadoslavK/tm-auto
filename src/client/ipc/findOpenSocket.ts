import ipc from 'node-ipc';

const isSocketTaken = (name: string): Promise<boolean> => new Promise(resolve => {
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
  let currentSocket = 0;
  let socketName = `${namePrefix}_${currentSocket}`;

  do {
    currentSocket++;
    socketName = `tm-auto_${currentSocket}`;
    // eslint-disable-next-line no-await-in-loop
  } while(await isSocketTaken(socketName));

  return socketName;
};