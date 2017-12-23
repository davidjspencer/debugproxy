/* @flow */

import type { SessionActionType } from 'types/dispatch/session'
import type { SessionStateType } from 'types/state/session'

export function session(state: SessionStateType = {
  active: true
}, action: SessionActionType): SessionStateType {
  switch (action.type) {
    case "SESSION_ACTIVE":
      return Object.assign({}, state, {
        active: true
      })
    case "SESSION_NOT_ACTIVE":
      return Object.assign({}, state, {
        active: false
      })
    default:
      return state
  }
}

export default session;
