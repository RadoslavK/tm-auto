import { ExecutionResult } from 'graphql';

export enum IpcHandler {
  GraphQL = 'graphql',
}

export enum GraphqlHandlerMessageType {
  Complete = 'complete',
  Data = 'data',
  Error = 'error',
}

export const createGraphqlHandlerDataMessage = (payload: ExecutionResult) =>
  ({
    type: GraphqlHandlerMessageType.Data,
    payload,
  } as const);

export const createGraphqlHandlerErrorMessage = (error: Error) =>
  ({
    type: GraphqlHandlerMessageType.Error,
    error: {
      message: error.message,
      stack: error.stack,
    },
  } as const);

export const createGraphqlHandlerCompleteMessage = () =>
  ({
    type: GraphqlHandlerMessageType.Complete,
  } as const);

export type GraphqlHandlerMessage = ReturnType<
  | typeof createGraphqlHandlerDataMessage
  | typeof createGraphqlHandlerErrorMessage
  | typeof createGraphqlHandlerCompleteMessage
>;
