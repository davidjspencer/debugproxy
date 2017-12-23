/* @flow */

import _ from 'lodash';
import { updateResponse, updateRequest, updateState, getRequest, getResponse } from 'lib/api';
import { updateRequestStateComplete, updateRequestState} from 'actions/request'

import type { RequestActionType } from 'types/dispatch/request';
import type { FlowActionType, FlowDispatchType } from 'types/dispatch/flow';
import type { StateType } from 'types/state';
import type { FlowType } from 'types/flow';


export function editRequestOverview(request: any) {
  return {
      type: "REQUEST_EDIT_REQUEST",
      request: request
  }
}

export function cancelOverview() {
  return {
    type: "REQUEST_EDIT_REQUEST",
    request: null
  }
}

export function receiveRequest(request: any) {
  return {
    type: "REQUEST_RECEIVE",
    request: request
  }
}


export function editOverview() {
  return (dispatch: FlowDispatchType, getState: () => StateType) => {
    dispatch(editRequestOverview(getState().flow.selected))
  }
}


export function updateOverview(request: FlowType) {
  return editRequestOverview(request)
}

export function saveOverview(request: FlowType) {
  return (dispatch: (RequestActionType | FlowActionType) => void, getState: () => StateType) => {
    var state : StateType = getState();
    if (state.flow.selected) {
      dispatch(updateRequestState());
      if (state.flow.selected) {
        updateState(
          state.flow.selected.id,
          state.socket.session_id,
          request,
          state.socket.csrf_token).then(function() {
            dispatch(updateRequestStateComplete());
            dispatch(cancelOverview())
            dispatch(receiveRequest(request))
        });
      }
    }
  }
}

// function updateRequestState(newState: FlowType, dispatch, getState) {
//   var state = getState();
//   if (state.request.selected) {
//     return
//   }
// }

export function resume() {
  return (dispatch: (RequestActionType | FlowActionType) => void, getState: () => StateType): void => {
    var state = getState();
    var selected = state.flow.selected

    if (selected) {
      var updated = _.clone(state.flow.selected);
      updated.intercepted = false;

      dispatch(updateRequestState());
      let updateStore = updateState(
        selected.id,
        state.socket.session_id,
        updated,
        state.socket.csrf_token);

      const responseData = state.response.response_data;
      const requestData = state.request.request_data;

      updateStore.then(function() {
        dispatch(updateRequestStateComplete());
        if (responseData != null && selected != null) {
          const update_promise = updateResponse(
            selected.id,
            state.socket.session_id,
            responseData,
            state.socket.csrf_token);

          update_promise.then(function() {

            // Response saved, now resume
            let socket = getState().socket.socket;
            if (socket) {
              socket.send(JSON.stringify({
                type: "resume",
                id: updated.id
              }));
            }

            dispatch(receiveRequest(updated))

          })

          update_promise.catch(function(e) {
            throw e;
          });

        } else if(requestData != null && selected != null) {

          const update_promise = updateRequest(
            selected.id,
            state.socket.session_id,
            requestData,
            state.socket.csrf_token);

          update_promise.then(function() {

            // Request saved, now resume
            let socket = getState().socket.socket;
            if (socket) {
              socket.send(JSON.stringify({
                type: "resume",
                id: updated.id
              }));
            }

            dispatch(receiveRequest(updated))

          })


        } else {
          let socket = getState().socket.socket;
          if (socket) {
            socket.send(JSON.stringify({
              type: "resume",
              id: updated.id
            }));
          }
          dispatch(receiveRequest(updated))
        }
      }).catch(function(e) {
        // dispatch error
        throw e;
      })
    }
  }
}
