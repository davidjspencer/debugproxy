/* @flow */

import { List } from 'immutable';
import _ from 'lodash';

import type { InterceptStateType } from 'types/state/intercepts'
import type { InterceptActionType } from 'types/dispatch/intercept'

export const defaultInterceptStateType: InterceptStateType = {
  selected: null,
  loading_error: false,
  loading: true,
  saving: false,
  save_error: false,
  intercepts: List(),
  editing: null
}

export function intercepts(state: InterceptStateType = defaultInterceptStateType,
  action: InterceptActionType): InterceptStateType {

  switch (action.type) {
    case "INTERCEPT_CREATE":
      return Object.assign({}, state, {
        selected: _.clone({ "query": "" })
      })
    case "INTERCEPT_RECEIVE":
      return Object.assign({}, state, {
        loading: false,
        loading_error: false,
        intercepts: List(action.intercepts)
      })
    case "INTERCEPT_RECEIVE_ERROR":
      return Object.assign({}, state, {
        loading_error: true
      })
    case "INTERCEPT_SELECT":
      return Object.assign({}, state, {
        save_error: false,
        selected: action.selected
      })
    case "INTERCEPTS_SAVE_START":
      return Object.assign({}, state, {
        saving: true
      })
    case "INTERCEPTS_DELETE_COMPLETE":
      {
        const intercept = action.intercept
        var index = state.intercepts.findIndex(function(i) {
          return i.id == intercept.id;
        })
        var intercepts = state.intercepts.delete(index);
        return Object.assign({}, state, {
          saving: false,
          selected: null,
          intercepts: intercepts
        })
      }
    case "INTERCEPTS_SAVE_COMPLETE":
      {
        const intercept = action.intercept
        var index = state.intercepts.findIndex(function(i) {
          return i.id == intercept.id;
        })
        var updated = _.clone(action.intercept)

        if (index >= 0) {
          var intercepts = state.intercepts.update(index, function(_) { return updated });
        } else {
          var intercepts = state.intercepts.push(updated);
        }
      }

      return Object.assign({}, state, {
        saving: false,
        selected: null,
        intercepts: intercepts
      })
    case "INTERCEPTS_SAVE_ERROR":
      return Object.assign({}, state, {
        save_error: true
      })
    case "INTERCEPT_CHANGE":
      var updated = _.clone(state.selected)
      updated.query = action.value
      return Object.assign({}, state, {
        selected: updated
      })

    default:
      return state;
  }
}

export default intercepts;
