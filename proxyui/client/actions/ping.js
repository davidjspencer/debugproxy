/* @flow */

import type { SessionDispatchType  } from 'types/dispatch/session';
import type { StateType } from 'types/state';
import type { FlowType } from 'types/flow';

export function pingServer() {
  return (dispatch: SessionDispatchType, getState: () => StateType) => {

    const state = getState()
    const session_id = state.socket.session_id;
    const csrf_token = state.socket.csrf_token;

    const headers = new Headers();
    headers.append("X-CSRFToken", csrf_token);

    window.fetch("/sessions/ping/" + session_id, {
      credentials: "same-origin",
      method: "GET",
      headers: headers
    }).then(function(response) {
      if (response.status !== 200) {
        console.log("ping failed");
      } else {
        response.json().then(function(data) {
          if (data.success) {
            dispatch({
              type: "SESSION_ACTIVE",
            })
          } else {
            dispatch({
              type: "SESSION_NOT_ACTIVE",
            })
          }
          dispatch({
            type: "CSRF_TOKEN",
            csrf_token: data.csrf_token
          })
        }).catch(function() {
          console.log("ping failed");
        })
      }
    }).catch(function() {
      console.log("ping failed");
    });
  }
}
