/* @flow */

import type { StateType } from 'types/state';

export type FocusDispatchType = (FocusActionType) => void;

export type FocusActionType =
  | InputFocusType
  | (dispatch: (FocusActionType) => void, getState: () => StateType) => void

export type InputFocusType = {
  type: "INPUT_FOCUS",
  input_focus: bool
}

