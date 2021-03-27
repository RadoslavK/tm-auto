import type { SubscribeFunction } from 'relay-runtime';

import type { IpcClient } from '../../_ipc/ipcUtils.js';
import { createGraphqlFunction } from './createGraphqlFunction.js';

export const createIpcSubscriptionFunction = (ipcClient: IpcClient): SubscribeFunction =>
  (request, variables) =>
    createGraphqlFunction(ipcClient, request, variables);