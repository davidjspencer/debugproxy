/* @flow */

import type { SocketStateType } from 'types/state/socket'
import type { SocketActionType } from 'types/dispatch/socket'

export function socket(state : SocketStateType = {
  username: "",
  password: "",
  session_id: "",
  csrf_token: "",
  socket: null,
  connected: false
}, action : SocketActionType) {
  switch (action.type) {
    case "CSRF_TOKEN":
      return Object.assign({}, state, {
        csrf_token: action.csrf_token
      })
    case "SOCKET_CREDENTIALS":
      return Object.assign({}, state, {
        username: action.username,
        password: action.password,
        session_id: action.session_id,
        csrf_token: action.csrf_token
      })
    case "SOCKET_OPEN":
      return Object.assign({}, state, {
        connected: true,
        socket: action.socket
      })
    case "SOCKET_CLOSE":
      return Object.assign({}, state, {
        connected: false,
        socket: null
      })
    case "SOCKET_ERROR":
      return Object.assign({}, state, {
        connected: false,
        socket: null
      })
    default:
      return state
  }
}

export default socket;
