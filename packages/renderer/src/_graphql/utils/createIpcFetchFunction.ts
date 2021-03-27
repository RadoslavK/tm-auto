import type { FetchFunction } from 'relay-runtime';
import type { RequestParameters } from 'relay-runtime/lib/util/RelayConcreteNode.js';
import type { Variables } from 'relay-runtime/lib/util/RelayRuntimeTypes.js';

import type { IpcClient } from '../../_ipc/ipcUtils.js';
import { createGraphqlFunction } from './createGraphqlFunction.js';

export const createIpcFetchFunction = (ipcClient: IpcClient): FetchFunction =>
  (request: RequestParameters, variables: Variables) =>
    createGraphqlFunction(ipcClient, request, variables);