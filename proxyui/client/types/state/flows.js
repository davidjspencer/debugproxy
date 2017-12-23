/* @flow */

import { List } from 'immutable';
import type { FlowType } from 'types/flow';

export type FlowsType = List<FlowType>;

export type FlowsStateType = {
  requests: FlowsType,
  reverse: bool,
  overflow: bool
}
