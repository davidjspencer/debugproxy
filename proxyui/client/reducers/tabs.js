/* @flow */

import _ from 'lodash';

import type { TabStateType } from 'types/state/tabs'
import type { TabActionType } from 'types/dispatch/tabs'

export function tabs(state : TabStateType = {
  selected: 'request'
}, action: TabActionType) {
  switch (action.type) {
    case "CHANGE_TAB":
      return Object.assign({}, state, {
        selected: _.clone(action.selected_tab)
      })
    default:
      return state
  }
}

export default tabs;
