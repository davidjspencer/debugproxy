/* @flow */

import type { FocusStateType } from 'types/state/focus'
import type { FocusActionType } from 'types/dispatch/focus'

export const defaultFocusState: FocusStateType = {
  input_focus: false
}

export function focus(state: FocusStateType = defaultFocusState, action: FocusActionType): FocusStateType {
  switch (action.type) {
    case "INPUT_FOCUS":
      return Object.assign({}, state, {
        input_focus: action.input_focus
      })
    default:
      return state
  }
}

export default focus;
