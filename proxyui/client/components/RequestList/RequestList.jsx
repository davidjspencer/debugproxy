/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux'
import Request from 'components/RequestList/Request';
import StatusCell from 'components/RequestList/StatusCell';
import Filter from 'components/Filters/Filter';
import ReverseButton from 'components/RequestList/ReverseButton';
import Overflow from 'components/RequestList/Overflow';
import { prettyUrl, truncate } from 'lib/utils';
import { Table, Column, Cell} from 'fixed-data-table-2';
import { selectRequest } from 'actions/list'

import RequestsDetails from 'components/Connection/RequestsDetails';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import List from 'react-virtualized/dist/commonjs/List'


import type { RequestActionType } from 'types/dispatch/request';
import type { ListActionType } from 'types/dispatch/list';
import type { StateType } from 'types/state';

type RowType = {
  index: any,
  isScrolling: any,
  key: any,
  style: any
}

type ListDimensionsType = {
  width: number,
  height: number
}

export class RequestListComponent extends Component<Props> {

  visibleItems() {
    const visible = this.props.requests.filter((e) =>
      prettyUrl(e, true).indexOf(this.props.query) >= 0);

    if (this.props.reverse) {
      return visible.reverse();
    } else {
      return visible;
    }
  }

  onRowClick(e: any, rowIndex: number) {
    const request = this.props.requests.get(rowIndex);
    this.props.dispatch(selectRequest(request));
  }

  _rowRenderer (width: number) {
    const items = this.visibleItems();
    return function(row: RowType ) {
      const { index, isScrolling, key, style } = row;
      const request = items.get(index)
      return (
        <div className="list-item" style={ style } key={ key }>
          <Request request={ request } width={ width } />
        </div>
      )
    }
  }


  renderList(dimensions: ListDimensionsType) {
    const { width, height } = dimensions
    const items = this.visibleItems();
    return (<List
      ref='List'
      className={ "my list" }
      rowCount={ items.count() }
      rowHeight={ 20 }
      rowRenderer={ this._rowRenderer(width).bind(this) }
      width={ width }
      height={ height }
    />)
  }

  render() {
    if (this.props.requests.count() > 0) {
      return (
        <div className="filter-request-container">
        <div className="titles">
          Request List
        </div>
        <Filter />
        <ReverseButton />
        <RequestsDetails />
          <div className="list-container">
            <AutoSizer>
            {
              this.renderList.bind(this)
            }
            </AutoSizer>
          </div>
        </div>
      )
    } else {
      return (
        <div className="filter-request-container">
        <div className="titles">
          Request List
        </div>
        <Filter />
        <ReverseButton />
        <RequestsDetails />
        <div className="request-list loading-list">
          { "Waiting for requests.." }
        </div>
        </div>

      )
    }
  };
}

type Props = {
  requests: any,
  query: string,
  dispatch: (RequestActionType | ListActionType) => void
}

function mapStateToProps(state: StateType) {
  return {
    reverse: state.flows.reverse,
    requests: state.flows.requests,
    query: state.filter.query
  }
}

export default connect(mapStateToProps)(RequestListComponent);
