import { connectSocket } from 'lib/socket';


import type { SocketOpen, SocketClose, SocketError } from 'types/actions/socket'

export function startSocket() {
  return (dispatch, getState) => {
    dispatch({
      type: "SOCKET_CREDENTIALS",
      username: window.username,
      password: window.password,
      session_id: window.session_id,
      csrf_token: window.csrf_token
    })

    var socket = connectSocket(dispatch);
  }
}

export function socketOpen(socket: any): SocketOpen {
  return {
    type: "SOCKET_OPEN",
    socket: socket
  }
}

export function socketError(): SocketError {
  return {
    type: "SOCKET_ERROR"
  }
}

export function socketClose(): SocketClose {
  return {
    type: "SOCKET_CLOSE"
  }
}
