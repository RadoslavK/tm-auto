export interface ISerializableGraphQLRequest {
  readonly context?: Record<string, any>;
  readonly extensions?: Record<string, any>;
  readonly operationName?: string;
  readonly query: string;
  readonly variables?: Record<string, any>;
}

export interface IGraphqlHandlerPayload {
  readonly request: ISerializableGraphQLRequest;
  readonly subscriptionId: string;
}