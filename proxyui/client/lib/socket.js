/* @flow */

import ReconnectingWebsocket from 'reconnecting-websocket';
import { socketOpen, socketClose, socketError } from 'actions/socket'

import type { SocketActionType } from 'types/dispatch/socket';
import type { RequestActionType } from 'types/dispatch/request';

var websocketUrl = window.websocket_url + "?id=" + window.session_id;

export function connectSocket(dispatch : (RequestActionType) => void) {
  var socket = new ReconnectingWebsocket(websocketUrl);

  socket.onopen = function(event) {
    dispatch(socketOpen());
  }.bind(this);

  socket.onerror = function(error) {
    dispatch(socketError());
  }.bind(this);

  socket.onclose = function(error) {
    dispatch(socketClose());
  }.bind(this);

  socket.onmessage = function(event) {
    var data = JSON.parse(event.data);
    if (data.type !== "log") {
      dispatch({
        type: "REQUEST_RECEIVE",
        request: data
      })
    }
  }.bind(this);
  return socket;
}
