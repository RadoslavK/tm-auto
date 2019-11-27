// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from 'electron';
import isDev from 'electron-is-dev';
import ipc from 'node-ipc';
import uuid from 'uuid';

let resolveSocketPromise: (name: string) => void;

const socketPromise = new Promise<string>(resolve => {
  resolveSocketPromise = resolve;
});

declare global {
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  interface Window {
    IS_DEV: boolean;
    getServerSocket: () => Promise<string>;
    generateId: () => string;
    ipcConnect: (id: string, callback: (client: any) => void) => void;
  }
}

window.IS_DEV = isDev;

window.getServerSocket = async (): Promise<string> => {
  return socketPromise;
};

ipcRenderer.on('set-socket', (_event: any, payload: { readonly name: string }) => {
  resolveSocketPromise(payload.name);
});

window.ipcConnect = (id: string, callback: any) => {
  ipc.config.silent = true;
  ipc.connectTo(id, () => {
    callback(ipc.of[id]);
  });
};

window.generateId = () => uuid.v4();