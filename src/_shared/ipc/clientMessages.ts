export type ClientMessage<TPayload> = {
  readonly id: string;
  readonly name: string;
  readonly payload: TPayload;
};
