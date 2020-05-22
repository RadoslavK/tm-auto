// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer } from 'electron';
import isDev from 'electron-is-dev';
import { IPC } from 'node-ipc';

type Writeable<T, TProps extends keyof T = keyof T> = { -readonly [P in TProps]: T[P] };

declare global {
  interface Window {
    readonly IS_DEV: boolean;
    readonly api: {
      readonly getSocketName: () => Promise<string>;
      readonly ipcConnect: (id: string, callback: (client: any) => void) => void;
      readonly ipcDisconnect: (id: string) => void;
    };
  }
}

(window as Writeable<Window, 'IS_DEV'>).IS_DEV = isDev;

const ipc = new IPC();

(window as Writeable<Window, 'api'>).api = {
  getSocketName: (): Promise<string> =>
    new Promise((resolve) => {
      ipcRenderer.removeAllListeners('set-socket-name');

      ipcRenderer.on('set-socket-name', (_event, socketName: string) => {
        ipcRenderer.removeAllListeners('set-socket-name');
        resolve(socketName);
      });

      ipcRenderer.send('request-socket-name');
    }),
  ipcConnect: (id: string, callback: any) => {
    ipc.config.silent = true;
    ipc.config.id = id;
    ipc.connectTo(id, () => {
      callback(ipc.of[id]);
    });
  },
  ipcDisconnect: (id: string) => {
    ipc.disconnect(id);
  },
};