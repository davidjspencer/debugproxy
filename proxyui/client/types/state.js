/* @flow */

import type { FilterStateType } from 'types/state/filter';
import type { FlowStateType } from 'types/state/flow';
import type { FlowsStateType } from 'types/state/flows';
import type { RequestStateType } from 'types/state/request';
import type { ResponseStateType } from 'types/state/response';
import type { SocketStateType } from 'types/state/socket';
import type { TabStateType } from 'types/state/tabs';
import type { LayoutStateType } from 'types/state/layout';
import type { InfoStateType } from 'types/state/info';
import type { InterceptStateType } from 'types/state/intercepts';


export type StateType = {
  flow: FlowStateType,
  flows: FlowsStateType,
  request: RequestStateType,
  response: ResponseStateType,
  socket: SocketStateType,
  tabs: TabStateType,
  filter: FilterStateType,
  layout: LayoutStateType,
  info: InfoStateType,
  intercepts: InterceptStateType
}

export type State = StateType
