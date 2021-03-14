import {
  FetchFunction,
  GraphQLResponse,
  Observable,
} from 'relay-runtime';
import { IpcClient } from '../../_ipc/ipcUtils';
import { fetchFunction } from './fetchFunction';

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