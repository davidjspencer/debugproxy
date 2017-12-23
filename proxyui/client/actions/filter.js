/* @flow */

import type { ChangeQueryType } from 'types/dispatch/filter';

export function changeQuery(query: string): ChangeQueryType {
  return {
    type: "CHANGE_QUERY",
    query: query
  }
}
