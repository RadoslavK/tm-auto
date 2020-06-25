import { Socket } from 'net';

// eslint-disable-next-line import/no-extraneous-dependencies
import { ipcRenderer, remote } from 'electron';
import { IPC } from 'node-ipc';

type Writeable<T, TProps extends keyof T = keyof T> = {
  -readonly [P in TProps]: T[P];
};

declare global {
  interface Window {
    readonly api: {
      readonly openSaveFileDialog: (defaultName?: string) => string | undefined;
      readonly openLoadFileDialog: () => string | undefined;
      readonly getSocketName: () => Promise<string>;
      readonly ipcConnect: (
        id: string,
        callback: (client: Socket) => void,
      ) => void;
      readonly ipcDisconnect: (id: string) => void;
    };
    readonly isDev: boolean;
  }
}

const ipc = new IPC();

(window as Writeable<Window, 'isDev'>).isDev =
  process.env.NODE_ENV !== 'production';

(window as Writeable<Window, 'api'>).api = {
  openSaveFileDialog: (defaultName?: string): string | undefined =>
    remote.dialog.showSaveDialogSync({
      defaultPath: defaultName,
      filters: [
        {
          name: 'Zip',
          extensions: ['zip'],
        },
      ],
    }),

  openLoadFileDialog: (): string | undefined => {
    const result = remote.dialog.showOpenDialogSync({
      filters: [
        {
          name: 'Zip',
          extensions: ['zip'],
        },
      ],
      properties: ['openFile'],
    });

    return result && result[0];
  },

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
