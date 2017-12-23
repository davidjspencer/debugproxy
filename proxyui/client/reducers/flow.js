/* @flow */

import _ from 'lodash';

import type { FlowStateType } from 'types/state/flow'
import type { FlowActionType } from 'types/dispatch/flow'

export const defaultFlowState: FlowStateType = {
  selected: null,
}

export function flow(state : FlowStateType = defaultFlowState, action : FlowActionType): FlowStateType {
  switch (action.type) {
    case "REQUEST_CLEAR_ALL":
      return Object.assign({}, state, {
        selected: null,
      })
    case "REQUEST_RECEIVE":
      let request = _.clone(action.request);
      if (!state.selected || state.selected.id == request.id) {
        return Object.assign({}, state, {
          selected: request
        });
      } else {
        return state;
      }
    case "REQUEST_SELECT":
      return Object.assign({}, state, {
        selected: action.request,
      })
    default:
      return state
  }
}

export default flow;
