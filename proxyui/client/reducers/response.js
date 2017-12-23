/* @flow */

import type { ResponseStateType } from 'types/state/response';
import type { ResponseActionType } from 'types/dispatch/response';

export const defaultResponseState: ResponseStateType = {
  loading_response: false,
  response_data: null,
  response_meta: null,
  updating_response: false,
  selected_response_header: null,
  selected_status_code: null
}

export function response(state : ResponseStateType = defaultResponseState, action: ResponseActionType): ResponseStateType {
  switch (action.type) {
    case "SELECT_STATUS_CODE":
        return Object.assign({}, state, {
          selected_status_code: action.status_code
        })
    case "REQUEST_SELECT_RESPONSE_HEADER":
        return Object.assign({}, state, {
          selected_response_header: action.header
        })
    case "REQUEST_CLEAR_ALL":
        return Object.assign({}, state, {
          loading_response: false,
          response_data: null,
          response_meta: null,
          updating_response: false,
        })
    case "REQUEST_SELECT":
      return Object.assign({}, state, {
        loading_response: false,
        updating_response: false,
        selected_response_header: null,
        selected_status_code: null,
        response_data: null,
        response_meta: null
      });
    case "REQUEST_LOAD_RESPONSE_DATA":
      return Object.assign({}, state, {
        response_data: null,
        response_meta: null,
        loading_response: true,
      });
    case "REQUEST_RECEIVE_RESPONSE_DATA":
      return Object.assign({}, state, {
        loading_response: false,
        response_data: action.data.value || "",
        response_meta: {
          "charset": action.data.charset,
          "content_type": action.data.content_type,
          "encoding": action.data.encoding,
          "success": action.data.success
        }
      });
    case "REQUEST_UPDATE_RESPONSE_DATA":
      return Object.assign({}, state, {
        updating_response: true
      })
    case "UPDATE_RESPONSE_BODY":
      return Object.assign({}, state, {
        response_data: action.value
      })
    case "REQUEST_UPDATE_RESPONSE_DATA_COMPLETE":
      return Object.assign({}, state, {
        updating_response: false,
        response_data: action.data
      })
    default:
      return state
  }
}

export default response;
