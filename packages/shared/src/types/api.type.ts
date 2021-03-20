import type { ServerMessage } from '../ipc/createServerMessage.js';

type ConnectParams = {
  readonly id: string
  readonly onMessage: (message: ServerMessage) => void;
  readonly onConnect: (callback: () => void) => void;
  readonly onDisconnect: (callback: () => void) => void;
};
type IpcApi = {
  readonly connect: (params: ConnectParams) => void;
  readonly disconnect: (id: string) => void;
  readonly getSocketName: () => Promise<string>;
  readonly sendMessage: (id: string, message: any) => void;
};
export type Api = {
  readonly ipc: IpcApi;
  readonly isDev: boolean;
  readonly openSaveFileDialog: (defaultName?: string) => string | undefined;
  readonly openLoadFileDialog: () => string | undefined;
};