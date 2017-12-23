/* @flow */

import type { StateType } from 'types/state';

export type RequestDispatchType = (RequestActionType) => void

export type RequestActionType =
  SelectHeaderType |
  ReceiveRequestType |
  LoadRequestBody |
  ReceiveRequestBody |
  UpdateRequestBody |
  UpdateRequestState |
  UpdateRequestStateComplete |
  (dispatch: RequestDispatchType, getState: () => StateType) => void

export type SelectHeaderType = {
  type: "REQUEST_SELECT_REQUEST_HEADER",
  header: any
}

export type ReceiveRequestType = {
  type: "REQUEST_RECEIVE",
  request: any
}

export type LoadRequestBody = {
  type: "REQUEST_LOAD_REQUEST_DATA"
}

export type ReceiveRequestBody = {
  type: "REQUEST_RECEIVE_REQUEST_DATA",
  data: any
}

export type UpdateRequestBody = {
  type: "UPDATE_REQUEST_BODY",
  value: string
}

export type UpdateRequestState = {
  type: "REQUEST_UPDATE_STATE",
  data: string
}

export type UpdateRequestStateComplete = {
  type: "REQUEST_UPDATE_STATE_COMPLETE"
}
