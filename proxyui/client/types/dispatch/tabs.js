/* @flow */

export type TabDispatchType = (TabActionType) => void

export type TabActionType =
  ChangeTab

export type ChangeTab = {
  type: "CHANGE_TAB",
  selected_tab: string
}
