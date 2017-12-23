/* @flow */

import type { SelectedHeaderType } from 'types/headers';
import type { FlowType } from 'types/flow';

export type RequestStateType = {
  loading_request: boolean,
  updating_request: boolean,
  selected_request_header: ?SelectedHeaderType;
  request_data: ?string,
  editing: ?FlowType
}
