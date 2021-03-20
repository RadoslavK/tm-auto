import { contextBridge, ipcRenderer, remote } from 'electron';
import type { Socket } from 'net';
import { IPC } from 'node-ipc';
import type { Api } from 'shared/types/api.type.js';

const ipc = new IPC();

const api: Api = {
  isDev: process.env.NODE_ENV !== 'production',

  ipc: {
    connect: ({
      id,
      onConnect,
      onDisconnect,
      onMessage,
    }) => {
      ipc.config.silent = true;
      ipc.config.id = id;

      const path = ipc.config.socketRoot + ipc.config.appspace + id;

      ipc.connectTo(id, path, () => {
        const client = ipc.of[id] as Socket;

        client.on('message', onMessage);
        client.on('connect', onConnect);
        client.on('disconnect', onDisconnect);
      });
    },

    sendMessage: (id: string, message: any) => {
      const client = ipc.of[id] as Socket

      client.emit('message', message);
    },

    disconnect: (id: string) => {
      ipc.disconnect(id);
    },

    getSocketName: () =>
      new Promise((resolve) => {
        ipcRenderer.removeAllListeners('set-socket-name');

        ipcRenderer.on('set-socket-name', (_event, socketName: string) => {
          ipcRenderer.removeAllListeners('set-socket-name');
          resolve(socketName);
        });

        ipcRenderer.send('request-socket-name');
      }),
  },

  openSaveFileDialog: (defaultName?: string) =>
    remote.dialog.showSaveDialogSync({
      defaultPath: defaultName,
      filters: [
        {
          name: 'Zip',
          extensions: ['zip'],
        },
      ],
    }),

  openLoadFileDialog: () => {
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
};

contextBridge.exposeInMainWorld('api', api);