/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import CSSTransition from 'react-transition-group/CSSTransition'

import type { StateType } from 'types/state';

export class InterceptInfoComponent extends Component<Props> {

  renderContent() {
    return (
      <div className="info-box" key="1">
        <div className="info-box-container">
          <h1 className="create-intercept-title title">Create Intercepts</h1>
          <p>
          Create rules to pause and modify requests.
          </p>
          <p>
          Every request that goes through the proxy is checked if the
          requested URL matches any intercept. If it does, the request is paused
          before the upstream request is made and before the response is
          recieved.
          </p>
          <p>
          Paused (intercepted) requests can be modified at both these stages. The resume
          button is used to instruct the proxy server to continue processing the
          request.
          </p>
      </div>
      </div>
    )
  }

  renderTransition() {
    if (this.props.show) {
      return (
        <CSSTransition
          classNames="delayed-fade"
          timeout={{ enter: 500, exit: 300 }}>
          { this.renderContent() }
        </CSSTransition>
      )
    } else {
      return null
    }
  }

  render() {
    return (
      <TransitionGroup>
        { this.renderTransition() }
      </TransitionGroup>
    )
  }
}

type Props = {
};

function mapStateToProps(state: StateType) {
  return {
    show: state.info.intercept_button
  }
}

export default connect(mapStateToProps)(InterceptInfoComponent);
