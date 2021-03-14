export type SerializableGraphQLRequest = {
  readonly name: string;
  readonly query: string;
  readonly variables: Record<string, unknown>;
};

export type GraphqlHandlerPayload = {
  readonly request: SerializableGraphQLRequest;
  readonly subscriptionId: string;
};
