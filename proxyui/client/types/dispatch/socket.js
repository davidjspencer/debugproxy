/* @flow */

import type { StateType } from 'types/state';

export type SocketDispatchType = (SocketActionType) => void;

export type SocketActionType =
  | SocketOpen
  | SocketError
  | SocketClose
  | (dispatch: (SocketActionType) => void, getState: () => StateType) => void

export type SocketOpen = {
  type: "SOCKET_OPEN",
  socket: any
}

export type SocketError = {
  type: "SOCKET_ERROR"
}

export type SocketClose = {
  type: "SOCKET_CLOSE"
}
