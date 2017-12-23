/* @flow */

import type { StateType } from 'types/state';

export type ResponseDispatchType = (
  ResponseActionType
) => null

export type ResponseActionType = (
  SelectHeaderType |
  ReceiveRequestType |
  LoadResponseBody |
  ReceiveResponseBody |
  UpdateResponseBody |
  SelectStatusCode |
  (dispatch: ResponseDispatchType, getState: () => StateType) => void
)

export type SelectHeaderType = {
  type: "REQUEST_SELECT_RESPONSE_HEADER",
  header: any
}

export type ReceiveRequestType = {
  type: "REQUEST_RECEIVE",
  request: any
}

export type LoadResponseBody = {
  type: "REQUEST_LOAD_RESPONSE_DATA"
}

export type ReceiveResponseBody = {
  type: "REQUEST_RECEIVE_RESPONSE_DATA",
  data: any
}

export type UpdateResponseBody = {
  type: "UPDATE_RESPONSE_BODY",
  value: string
}

export type SelectStatusCode = {
    type: "SELECT_STATUS_CODE",
    status_code: ?string
}
