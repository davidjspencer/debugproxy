/* @flow */
export type RequestsStateType = {
  selected: any,
  loading_response: boolean,
  response_data: string
}

export type SocketStateType = {

}

export type StateType = {
  requests: RequestsStateType
}

export type DispatchType = (
  DispatchConnectType
) => null

export type DispatchConnectType = {
  type: "CONNECT" | "DISCONNECT"
}


export type SelectTabType = "overview" | "request" | "response"
