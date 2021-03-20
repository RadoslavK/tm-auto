import {
  FetchFunction,
  GraphQLResponse,
  Observable,
} from 'relay-runtime';
import { IpcClient } from '../../_ipc/ipcUtils.js';
import { fetchFunction } from './fetchFunction.js';

export const createIpcFetchFunction = async (ipcClient: IpcClient): Promise<FetchFunction> => {
  await ipcClient.initConnection();

  return (request, variables) => {
    return Observable.create<GraphQLResponse>(sink => {
      fetchFunction({
        ipcClient,
        request,
        sink,
        variables,
      });
    });
  };
};