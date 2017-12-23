/* @flow */

import type { StateType } from 'types/state';

export type ListDispatchType = (ListActionType) => null

export type ListActionType =
  ListDirectionType |
  ClearAllType |
  SelectRequestType |
  (dispatch: ListDispatchType, getState: () => StateType) => void

export type ListDirectionType = {
  type: "LIST_DIRECTION",
  reverse: bool
}

export type ClearAllType = {
  type: "REQUEST_CLEAR_ALL"
}

export type SelectRequestType = {
  type: "REQUEST_SELECT",
  request: any
}
