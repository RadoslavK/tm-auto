export interface IClientMessage<TPayload> {
  readonly id: string;
  readonly name: string,
  readonly payload: TPayload;
}