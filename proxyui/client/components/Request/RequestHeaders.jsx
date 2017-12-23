/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux'
import Header from 'components/Headers/Header';
import RequestHeaderDetail from 'components/Request/RequestHeaderDetail';
import { editRequestHeader, quickDeleteRequestHeader, createRequestHeader } from 'actions/request';
import { canEditRequest } from 'lib/utils';

import type { FlowType } from 'types/flow'
import type { SelectedHeaderType } from 'types/headers'
import type { RequestDispatchType } from 'types/dispatch/request';
import type { StateType } from 'types/state';

export class RequestHeadersComponent extends Component<Props> {

  canEdit() {
    return canEditRequest(this.props.selected);
  }

  editHeaders(header: [string, string], index: number) {
    this.props.dispatch(editRequestHeader(header, index));
  }

  deleteHeader(header: [string, string], index: number) {
    this.props.dispatch(quickDeleteRequestHeader(index));
  }

  createHeader() {
    this.props.dispatch(createRequestHeader());
  }

  renderHeader(header: [string, string], index: number) {
    if (this.props.selected_header && this.props.selected_header.index == index) {
      return (
        <RequestHeaderDetail />
      )
    } else {
      if (this.props.selected_header) {
        return (
            <Header header={ header }
              onClick={ () => this.editHeaders(header, index) }
              onDelete={ null }
            />)
      } else {
        if (this.canEdit()) {
          return (
            <Header header={ header }
              onClick={ () => this.editHeaders(header, index) }
              onDelete={ () => this.deleteHeader(header, index) }
            />
          )
        } else {
          return (
            <Header header={ header }
              onClick={ () => this.editHeaders(header, index) }
              onDelete={ null }
            />
          )
        }
      }
    }
  }

  isEditingNewHeader() {
    return this.props.selected_header && this.props.selected_header.index == null;
  }

  newHeader() {
    if (this.isEditingNewHeader()) {
      return (
        <div>
          <RequestHeaderDetail />
        </div>
        )
    }
  }

  headers() {
    return (this.props.selected && this.props.selected.request) ? this.props.selected.request.headers : []
  }

  renderHeaders() {
    return this.headers().map((header, index) => (
      <div key={ index }>
        { this.renderHeader(header, index) }
      </div>
    ));
  }

  renderExistingHeaders() {
    if (this.headers().length > 0 || this.isEditingNewHeader()) {
      return (
        <div>
        <div className="headers">
          { this.renderHeaders() }
        </div>
          { this.newHeader() }
        </div>
      )
    } else {
      return (
        <div className="no-headers">
          No headers
        </div>
      );
    }
  }

  renderAddHeader() {
    if (!this.props.selected_header && this.canEdit()) {
      return (
        <div>
          <button className="green margin-top" onClick={ () => this.createHeader() }>Add Header</button>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="headers">
        { this.renderExistingHeaders() }
        { this.renderAddHeader() }
      </div>
    );
  }
}


type State = {
  selected: FlowType,
  selected_header: SelectedHeaderType,
}

type Dispatch = {
  dispatch: RequestDispatchType
}

type Props = State & Dispatch;

function mapStateToProps(state : StateType) {
  return {
    selected: state.flow.selected,
    selected_header: state.request.selected_request_header
  }
}

function mapDispatchToProps(dispatch, props): Dispatch {
  return {
    dispatch: dispatch
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, stateProps, dispatchProps)
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps, { withRef: true })(RequestHeadersComponent)
