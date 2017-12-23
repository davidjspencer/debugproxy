/* @flow */

import type { StateType } from 'types/state';
import type { InterceptType, InterceptsType } from 'types/intercept';

export type InterceptDispatchType = (InterceptActionType) => void

export type InterceptActionType =
  | ReceiveIntercept
  | ReceiveInterceptError
  | SelectIntercept
  | CreateIntercept
  | InterceptSaveComplete
  | InterceptSaveError
  | InterceptSaveStart
  | ChangeIntercept
  | CancelIntercept
  | InterceptDeleteComplete
  | (dispatch: InterceptDispatchType, getState: () => StateType) => void

export type ReceiveIntercept = {
  type: "INTERCEPT_RECEIVE",
  intercepts: InterceptsType
}

export type ReceiveInterceptError = {
  type: "INTERCEPT_RECEIVE_ERROR"
}

export type SelectIntercept = {
  type: "INTERCEPT_SELECT",
  selected: InterceptType
}

export type CreateIntercept = {
  type: "INTERCEPT_CREATE"
}

export type InterceptSaveComplete = {
  type: "INTERCEPTS_SAVE_COMPLETE",
  intercept: InterceptType
}

export type InterceptSaveError = {
  type: "INTERCEPTS_SAVE_ERROR"
}

export type InterceptSaveStart = {
  type: "INTERCEPTS_SAVE_START"
}

export type ChangeIntercept = {
  type: "INTERCEPT_CHANGE",
  value: InterceptType
}

export type CancelIntercept = {
  type: "INTERCEPT_SELECT",
  selected: InterceptType
}

export type InterceptDeleteComplete = {
  type: "INTERCEPTS_DELETE_COMPLETE",
  intercept: InterceptType
}
