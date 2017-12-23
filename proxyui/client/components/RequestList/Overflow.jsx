/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux'

import type { State } from 'types/state';

export class OverflowComponent extends Component<Props> {

  render() {
    if (this.props.overflow) {
      return (
        <div className="most-recent-warning">
          Only the most recent { this.props.requests.size } requests will be shown.
        </div>
      )
    } else {
      return (null);
    }
  }
}

type Props = {
  requests: any,
  overflow: boolean
};

function mapStateToProps(state: State): Props {
  return {
    overflow: state.flows.overflow,
    requests: state.flows.requests
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, stateProps, dispatchProps)
}

export default connect(mapStateToProps)(OverflowComponent);
