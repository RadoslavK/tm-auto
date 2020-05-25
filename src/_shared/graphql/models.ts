export type SerializableGraphQLRequest = {
  readonly context?: Record<string, any>;
  readonly extensions?: Record<string, any>;
  readonly operationName?: string;
  readonly query: string;
  readonly variables?: Record<string, any>;
};

export type GraphqlHandlerPayload = {
  readonly request: SerializableGraphQLRequest;
  readonly subscriptionId: string;
};