/* @flow */

export type UserActionType = (
  UserConnectAction
)

export type UserConnectAction = {
  type: "CONNECT" | "DISCONNECT"
}
