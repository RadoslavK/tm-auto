import {
  FetchFunction,
  GraphQLResponse,
  Observable,
} from 'relay-runtime';

import type { IpcClient } from '../../_ipc/ipcUtils.js';
import { fetchFunction } from './fetchFunction.js';

export const createIpcFetchFunction = async (ipcClient: IpcClient): Promise<FetchFunction> => {
  await ipcClient.initConnection();

  return (request, variables) => {
    return Observable.create<GraphQLResponse>(sink => {
      if (typeof request.text !== 'string') {
        throw new Error('Invalid query');
      }

      fetchFunction({
        ipcClient,
        request: {
          name: request.name,
          query: request.text,
          variables,
        },
        observer: sink,
        getData: (payload): GraphQLResponse => {
          // TODO can data and errors be at the same time? or be both null?
          return payload.data
            ? {
              data: payload.data,
            }
            : {
              errors: payload.errors?.map(e => ({ message: e.message })) ?? [],
            };
        },
      });
    });
  };
};