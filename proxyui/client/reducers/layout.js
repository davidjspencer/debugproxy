/* @flow */

import type { LayoutStateType } from 'types/state/layout'
import type { LayoutDispatchType } from 'types/dispatch/layout'

export const defaultLayoutType: LayoutStateType = {
  layout: "split",
  show_connection_info: true,
  seen_request: false
}

export function layout(state: LayoutStateType = defaultLayoutType, action: LayoutDispatchType): LayoutStateType {
  switch (action.type) {
    case "SET_LAYOUT":
      return Object.assign({}, state, {
        layout: action.layout
      })
    case "SHOW_CONNECTION_INFO":
      return Object.assign({}, state, {
        show_connection_info: action.show
      })

    case "REQUEST_RECEIVE":
      if (!state.seen_request) {
        return Object.assign({}, state, {
          show_connection_info: false,
          seen_request: true
        })
      }

    default:
      return state
  }
}

export default layout;
