export type SerializableGraphQLRequest = {
  readonly context?: Record<string, unknown>;
  readonly extensions?: Record<string, unknown>;
  readonly operationName?: string;
  readonly query: string;
  readonly variables?: Record<string, unknown>;
};

export type GraphqlHandlerPayload = {
  readonly request: SerializableGraphQLRequest;
  readonly subscriptionId: string;
};
