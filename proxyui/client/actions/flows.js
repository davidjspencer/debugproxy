/* @flow */

import type { FlowsDispatchType  } from 'types/dispatch/flows';
import type { StateType } from 'types/state';
import type { FlowType } from 'types/flow';

export function addFlow(flow : FlowType) {
  return (dispatch: FlowsDispatchType, getState: () => StateType) => {
    dispatch({
      type: "REQUEST_RECEIVE",
      request: flow
    });
  }
}
