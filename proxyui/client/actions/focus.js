/* @flow */

import type { FocusDispatchType } from 'types/dispatch/focus';
import type { StateType } from 'types/state';

export function takeInputFocus() {
  return (dispatch: FocusDispatchType, getState: () => StateType) => {
    dispatch({
      type: "INPUT_FOCUS",
      input_focus: true
    });
  }
}

export function releaseInputFocus() {
  return (dispatch: FocusDispatchType, getState: () => StateType) => {
    dispatch({
      type: "INPUT_FOCUS",
      input_focus: false
    });
  }
}
