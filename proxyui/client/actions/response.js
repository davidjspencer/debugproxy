/* @flow */
import _ from 'lodash';
import { updateResponse, getResponse } from 'lib/api';

import type { ResponseDispatchType  } from 'types/dispatch/response';
import type { StateType } from 'types/state';

export function selectStatusCode(status_code: ?string) {
  return {
    type: "SELECT_STATUS_CODE",
    status_code: status_code
  }
}

export function saveStatusCode() {
  return (dispatch: ResponseDispatchType, getState: () => StateType) => {
    var state = getState()
    var updated = _.clone(state.flow.selected);
    updated.response.status_code = state.response.selected_status_code;
    dispatch(selectStatusCode(null));
    dispatch({
      type: "REQUEST_RECEIVE",
      request: updated
    });
  }
}

export function cancelResponseHeader() {
  return {
    type: "REQUEST_SELECT_RESPONSE_HEADER",
    header: null
  }
}

export function updateResponseHeader() {
  return (dispatch: ResponseDispatchType, getState: () => StateType) => {
    var state = getState();
    var header = state.response.selected_response_header;
    var selected = state.flow.selected;
    if (selected && header) {
      var updated = _.clone(selected);
      var newHeader = [
        header.name,
        header.value
      ];
      var index = header.index;
      if (index != null) {
        updated.response.headers[index] = newHeader;
      } else {
        updated.response.headers.push(newHeader);
      }

      dispatch(cancelResponseHeader())

      dispatch({
        type: "REQUEST_RECEIVE",
        request: updated
      })
    }
  }
}

export function createResponseHeader() {
  return {
    type: "REQUEST_SELECT_RESPONSE_HEADER",
    header: {
      name: "",
      value: "",
      index: null
    }
  }
}

export function quickDeleteResponseHeader(index: number) {

  return (dispatch: ResponseDispatchType, getState: () => StateType) => {
    var state = getState();
    var updated = _.clone(state.flow.selected);
    var selected = state.flow.selected;
    if (selected) {
      var newHeaders = selected.response.headers;
      newHeaders.splice(index, 1);
      updated.response.headers = newHeaders;
      dispatch({
        type: "REQUEST_RECEIVE",
        request: updated
      })
    }
  }
}

export function deleteResponseHeader() {
  return (dispatch: ResponseDispatchType, getState: () => StateType) => {
    var state = getState();
    var updated = _.clone(state.flow.selected);
    var header = state.response.selected_response_header;
    var selected = state.flow.selected;
    if (header && selected) {
      var newHeaders = selected.response.headers;
      var index = header.index;
      if (index !== null && index !== undefined) {
        newHeaders.splice(index, 1);
        updated.response.headers = newHeaders;
        dispatch(cancelResponseHeader())
        dispatch({
          type: "REQUEST_RECEIVE",
          request: updated
        })
      }
    }
  }
}


export function changeResponseHeader(name: string, value: string) {
  return (dispatch: ResponseDispatchType, getState: () => StateType) => {
    var state = getState();
    if (state.response.selected_response_header) {
      dispatch({
        type: "REQUEST_SELECT_RESPONSE_HEADER",
        header: {
          name: name,
          value: value,
          index: state.response.selected_response_header.index
        }
      })
    }
  }
}

export function editResponseHeader(header: [string, string], index: number) {
  return {
    type: "REQUEST_SELECT_RESPONSE_HEADER",
    header: {
      name: header[0],
      value: header[1],
      index: index
    }
  }
}

export function updateResponseBody(value: string) {
  return (dispatch: ResponseDispatchType, getState: () => StateType) => {
    dispatch({
      type: "UPDATE_RESPONSE_BODY",
      value: value
    })
  }
}


export function saveResponseBody(value: string) {
  return (dispatch: ResponseDispatchType, getState: () => StateType) => {
    var state = getState();
    if (state.flow.selected) {
      updateResponse(
        state.flow.selected.id,
        state.socket.session_id,
        value,
        state.socket.csrf_token);
    }
  }
}

export function loadResponse(request_id: string) {
  return (dispatch: ResponseDispatchType, getState: () => StateType) => {
    var state = getState();
    dispatch({
      type: "REQUEST_LOAD_RESPONSE_DATA"
    });

    getResponse(
      state.socket.session_id,
      request_id
    ).then(function(response) {
      response.json().then(function(data) {
        dispatch({
          type: "REQUEST_RECEIVE_RESPONSE_DATA",
          data: data
        })
      }).catch(function() {
        console.error("ERROR: reading raw response");
      });
    }).catch(function() {
      console.error("ERROR: requesting raw response");
    });
  }
}
