export enum ServerMessageType {
  Error = 'error',
  Push = 'push',
  Reply = 'reply',
}

export const createServerBroadcastMessage = <TPayload>(name: string, payload: TPayload) => ({
  name,
  payload,
  type: ServerMessageType.Push,
} as const);

export const createServerErrorMessage = (id: string, payload: Error) => ({
  id,
  payload,
  type: ServerMessageType.Error,
} as const);

export const createServerReplyMessage = <TPayload>(id: string, payload: TPayload) => ({
  id,
  payload,
  type: ServerMessageType.Reply,
} as const);

export type ServerMessage = ReturnType<
  | typeof createServerBroadcastMessage
  | typeof createServerErrorMessage
  | typeof createServerReplyMessage
>;
