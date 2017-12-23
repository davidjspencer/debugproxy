/* @flow */

import _ from 'lodash';

import type { FilterStateType } from 'types/state/filter'
import type { FilterDispatchType } from 'types/dispatch/filter'

export const defaultFilterState: FilterStateType = {
  query: ''
}

export function filter(state: FilterStateType = defaultFilterState, action: FilterDispatchType): FilterStateType {
  switch (action.type) {
    case "CHANGE_QUERY":
      return Object.assign({}, state, {
        query: _.clone(action.query)
      })
    default:
      return state
  }
}

export default filter;
