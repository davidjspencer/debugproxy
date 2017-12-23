/* @flow */

import type { StateType } from 'types/state';

import type { FilterActionType } from 'types/dispatch/filter'
import type { RequestActionType } from 'types/dispatch/request'
import type { FlowActionType } from 'types/dispatch/flow'

export type AnyDispatch = (AnyAction) => void

export type AnyAction =
  | FilterActionType
  | RequestActionType
  | FlowActionType
  | (dispatch: AnyDispatch, getState: () => StateType) => void
