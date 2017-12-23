/* @flow */

import type { StateType } from 'types/state';

export type FlowsDispatchType = (
  RecieveType
) => null

export type FlowsActionType =
  | RecieveType
  | (dispatch: FlowsDispatchType, getState: () => StateType) => void

export type RecieveType = {
  type: "REQUEST_RECEIVE",
  request: any
}
