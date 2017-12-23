/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux'

import Headers from 'components/Headers/Headers';
import RequestHeaders from 'components/Request/RequestHeaders';
import RequestHeaderDetail from 'components/Request/RequestHeaderDetail';

import type { StateType } from 'types/state';

export class RequestComponent extends Component<Props> {

  renderRequestData() {
    if (this.props.loading_request) {
      return (
        <div>
        Loading Raw Request Data
        </div>
      )
    } else {
      return (
        <div>
        <div className="titles">
          Request List
        </div>
          <pre>
            { this.props.request_data }
          </pre>
        </div>
      )
    }
  }


  render() {
    return (
      <div>
        <RequestHeaders />
      </div>
    )
  }
}

type Props = {
  loading_request: boolean,
  request_data: string
};


function mapStateToProps(state : StateType) {
  return {
    loading_request: state.request.loading_request,
    request_data: state.request.request_data,
    selected_header: state.request.selected_request_header
  }
}

export default connect(mapStateToProps)(RequestComponent);
