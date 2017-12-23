/* @flow */

import type { InterceptType, InterceptsType } from 'types/intercept';

export type InterceptStateType = {
  selected: ?InterceptType,
  save_error: boolean,
  loading: boolean,
  loading_error: boolean,
  intercepts: InterceptsType
}
