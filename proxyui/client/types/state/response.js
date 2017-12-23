/* @flow */

import type { SelectedHeaderType } from 'types/headers';
import type { FlowType } from 'types/flow';

export type ResponseStateType = {
  loading_response: boolean,
  updating_response: boolean,
  selected_response_header: ?SelectedHeaderType,
  response_data: ?string,
  selected_status_code: ?string,
  response_meta: ?ResponseMetaType
}

export type ResponseMetaType = {
  charset: any
}
