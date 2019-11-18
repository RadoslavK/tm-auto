// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from 'electron';
import isDev from 'electron-is-dev';
import ipc from 'node-ipc';
import uuid from 'uuid';

let resolveSocketPromise: (name: string) => void;

const socketPromise = new Promise<string>((resolve, reject) => {
  resolveSocketPromise = resolve;
});

interface IClientWindow {
  IS_DEV: boolean;
  getServerSocket: () => Promise<string>;
  uuid: () => string;
  ipcConnect: (id: string, callback: (client: any) => void) => void;
}

const clientWindow = window as any as IClientWindow;

clientWindow.IS_DEV = isDev;

clientWindow.getServerSocket = async (): Promise<string> => {
  return socketPromise;
};

ipcRenderer.on('set-socket', (_event: any, payload: { readonly name: string }) => {
  resolveSocketPromise(payload.name);
});

clientWindow.ipcConnect = (id: string, callback: any) => {
  ipc.config.silent = true;
  ipc.connectTo(id, () => {
    callback(ipc.of[id]);
  });
};

clientWindow.uuid = uuid;