/* @flow */

import type { StateType } from 'types/state';

export type FlowDispatchType = (FlowActionType) => void

export type FlowActionType =
  DispatchRequestLoadRequestDateType |
  DispatchRequestLoadResponseDateType |
  DispatchRequestReceiveRequestDataType |
  DispatchRequestRecieveResponseData |
  DispatchRequestEditRequest |
  DispatchRequestRecieve |
  DispatchRequestUpdate |
  (dispatch: FlowDispatchType, getState: () => StateType) => void

export type DispatchRequestLoadRequestDateType = {
  type: "REQUEST_LOAD_REQUEST_DATA"
}

export type DispatchRequestLoadResponseDateType = {
  type: "REQUEST_LOAD_RESPONSE_DATA"
}

export type DispatchRequestReceiveRequestDataType = {
  type: "REQUEST_RECEIVE_REQUEST_DATA",
  data: string
}

export type DispatchRequestUpdate = {
  type: "REQUEST_UPDATE",
  request: any
};

export type DispatchRequestRecieveResponseData = {
  type: "REQUEST_RECEIVE_RESPONSE_DATA",
  data: string
}

export type DispatchRequestRecieve = {
  type: "REQUEST_RECEIVE",
  request: any
}

export type DispatchRequestEditRequest = {
  type: "REQUEST_EDIT_REQUEST",
  request: any
}
