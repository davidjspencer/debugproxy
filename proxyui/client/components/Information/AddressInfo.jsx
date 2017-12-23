/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import CSSTransition from 'react-transition-group/CSSTransition'

import type { StateType } from 'types/state'

export class AddressInfoComponent extends Component<Props> {

  renderContent() {
    if (this.props.show) {
      return (
        <div className="info-box" key="key" id="address-info">
          <div className="info-box-container">
            <h1 className="title">
            Proxy server details
            </h1>
            <p>
              This includes the <span className="info-server">host</span> and <span className="info-port">port</span> the proxy server is listening on and
              the <span className="info-username">username</span> and <span className="info-password">password</span> used to authentice proxy requests for this session.
            </p>
            <p>
              A device, app or browser needs to be configured with these
              settings for the traffic to route through the proxy and be seen in this dashboard.
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
  show: boolean
};

function mapStateToProps(state: StateType) {
  return {
    show: state.info.address
  }
}

export default connect(mapStateToProps)(AddressInfoComponent);
