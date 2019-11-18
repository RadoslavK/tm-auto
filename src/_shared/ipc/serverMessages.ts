export enum ServerMessageType {
  Push = 'push',
  Error = 'error',
  Reply = 'reply',
}

export const createServerBroadcastMessage = <TPayload>(name: string, payload: TPayload) => ({
  type: ServerMessageType.Push,
  payload,
  name,
}) as const;

export const createServerErrorMessage = (id: string) => ({
  type: ServerMessageType.Error,
  id,
}) as const;

export const createServerReplyMessage = <TPayload>(id: string, payload: TPayload) => ({
  type: ServerMessageType.Reply,
  id,
  payload,
}) as const;

export type ServerMessage = ReturnType<
  typeof createServerBroadcastMessage
  | typeof createServerErrorMessage
  | typeof createServerReplyMessage
>;