/* @flow */

export type LayoutDispatchType = (
  ShowConnectionInfo
) => null

export type ShowConnectionInfo = {
  type: "SHOW_CONNECTION_INFO",
  show: bool
}
