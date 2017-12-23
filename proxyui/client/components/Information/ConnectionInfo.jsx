/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import CSSTransition from 'react-transition-group/CSSTransition'

import type { StateType } from 'types/state';

export class ConnectionInfoComponent extends Component<Props> {

  renderContent() {
    if (this.props.show) {
      return (
        <div className="info-box-right" key="key" id="connection-info">
          <div className="info-box-container">
            <h1 className="title">
              Dashboard server connection
            </h1>
            <p>
              This shows the state of the connection between this page and
              debugProxy. This needs to be connected to see requests going through
              the proxy on this dashboard. When this is not connected, the proxy
              will still work but requests won't be shown in this dashboard.
            </p>
          </div>
        </div>
      )
    } else {
      return (
        <div key="key"></div>
      );
    }
  }

  render() {
    return (
      <TransitionGroup>
        <CSSTransition
          classNames="delayed-fade"
          timeout={{ enter: 500, exit: 300 }}>
          { this.renderContent() }
        </CSSTransition>
      </TransitionGroup>
    )
  }
}

type Props = {
};

function mapStateToProps(state: StateType) {
  return {
    show: state.info.connection
  }
}

export default connect(mapStateToProps)(ConnectionInfoComponent);
