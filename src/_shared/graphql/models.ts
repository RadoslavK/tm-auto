export interface ISerializableGraphQLRequest {
  readonly query: string;
  readonly variables?: Record<string, any>;
  readonly operationName?: string;
  readonly context?: Record<string, any>;
  readonly extensions?: Record<string, any>;
}

export interface IGraphqlHandlerPayload {
  readonly subscriptionId: string;
  readonly request: ISerializableGraphQLRequest;
}