/* @flow */

import type { StateType } from 'types/state';

export type SessionDispatchType = (SessionActionType) => null

export type SessionActionType =
  | SessionActiveType
  | SessionNotActiveType
  | CsrfType
  | (dispatch: SessionDispatchType, getState: () => StateType) => void

export type SessionActiveType = {
  type: "SESSION_ACTIVE",
}

export type SessionNotActiveType = {
  type: "SESSION_NOT_ACTIVE",
}

export type CsrfType = {
  type: "CSRF_TOKEN",
  csrf_token: string
}
