export enum IpcHandler {
  GraphQL = 'graphql',
}

export enum GraphqlHandlerMessageType {
  Complete = 'complete',
  Data = 'data',
  Error = 'error'
}

export const createGraphqlHandlerDataMessage = (data: any) => ({
  data,
  type: GraphqlHandlerMessageType.Data,
}) as const;

export const createGraphqlHandlerErrorMessage = (error: Error) => ({
  error,
  type: GraphqlHandlerMessageType.Error,
}) as const;

export const createGraphqlHandlerCompleteMessage = () => ({
  type: GraphqlHandlerMessageType.Complete,
}) as const;

export type GraphqlHandlerMessage = ReturnType<
  typeof createGraphqlHandlerDataMessage
| typeof createGraphqlHandlerErrorMessage
| typeof createGraphqlHandlerCompleteMessage
>;