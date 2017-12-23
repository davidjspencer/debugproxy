/* @flow */

export type InfoDispatchType = (InfoActionType) => null

export type InfoActionType =
  EventType

export type EventType = {
  type: Events,
  show: bool
}

type Events = (
  'INTERCEPT_INFO_MOUSE' | 'INTERCEPT_INFO_SHOW' |
  'ADDRESS_INFO_MOUSE' | 'ADDRESS_INFO_SHOW' |
  'CONNECTION_INFO_MOUSE' | 'CONNECTION_INFO_SHOW' |
  'PROGRESS_INFO_1_MOUSE' | 'PROGRESS_INFO_1_SHOW' |
  'PROGRESS_INFO_2_MOUSE' | 'PROGRESS_INFO_2_SHOW' |
  'PROGRESS_INFO_3_MOUSE' | 'PROGRESS_INFO_3_SHOW' |
  'PROGRESS_INFO_4_MOUSE' | 'PROGRESS_INFO_4_SHOW' |
  'CLEAR_INFO_MOUSE' | 'CLEAR_INFO_SHOW' |
  'RESUME_REQUEST_INFO_MOUSE' | 'RESUME_REQUEST_INFO_SHOW' |
  'RESUME_RESPONSE_INFO_MOUSE' | 'RESUME_RESPONSE_INFO_SHOW'
)