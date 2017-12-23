/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux'

import type { State } from 'types/state';

export class RequestCountComponent extends Component<Props> {

  render() {
    return (
      <div className="request-count">
        { "Requests:  "} <span>{ this.props.requests.count() }</span>
      </div>
    )
  }
}

type Props = {
  requests: any
};

function mapStateToProps(state: State) {
  return {
    requests: state.flows.requests
  }
}

export default connect(mapStateToProps)(RequestCountComponent);
