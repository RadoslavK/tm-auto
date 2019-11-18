export enum IpcHandler {
  GraphQL = 'graphql',
}

export enum GraphqlHandlerMessageType {
  Data = 'data',
  Error = 'error',
  Complete = 'complete',
}

export const createGraphqlHandlerDataMessage = (data: any) => ({
  type: GraphqlHandlerMessageType.Data,
  data,
}) as const;

export const createGraphqlHandlerErrorMessage = (error: Error) => ({
  type: GraphqlHandlerMessageType.Error,
  error,
}) as const;

export const createGraphqlHandlerCompleteMessage = () => ({
  type: GraphqlHandlerMessageType.Complete,
}) as const;

export type GraphqlHandlerMessage = ReturnType<
  typeof createGraphqlHandlerDataMessage
  | typeof createGraphqlHandlerErrorMessage
  | typeof createGraphqlHandlerCompleteMessage
>;