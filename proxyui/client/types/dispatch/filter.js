/* @flow */

export type FilterDispatchType = (FilterActionType) => null

export type FilterActionType =
  | ChangeQueryType

export type ChangeQueryType = {
  type: "CHANGE_QUERY",
  query: string
}
