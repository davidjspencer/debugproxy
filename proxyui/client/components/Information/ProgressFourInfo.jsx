/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import CSSTransition from 'react-transition-group/CSSTransition'

import type { StateType } from 'types/state';


export class ProgressFourInfoComponent extends Component<Props> {

  renderState() {
    if (!this.props.request && !this.props.response) {
      return (
        <div>
          <p>
            { "During the state the response is being returned to the client." }
          </p>
          <p>
            { "There is nothing more that can be done to the request." }
          </p>
        </div>
      )
    }

    if (this.props.request.response && this.props.request.intercepted) {
      return (
        <p>
          { "Response is being held before for it is returned to the client. It can be modified now." }
        </p>
      )
    }

    if (this.props.request.response && !this.props.request.intercepted) {
      return (
        <p>
          { "The response has been returned to the client" }
        </p>
      )
    }
    return (
      <p>
        { "The request is still in progress and has not been returned. The client is still waiting" }
      </p>
    )
  }

  renderContent() {
    if (this.props.show) {
      return (
        <div className="info-box-right" key="key">
          <div className="info-box-container">
            <h1 className="title response">
               { "Response returned to the client" }
            </h1>
            { this.renderState() }
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
  request: any
};

function mapStateToProps(state: StateType) {
  return {
    show: state.info.progress_state_4,
    request: state.flow.selected
  }
}

export default connect(mapStateToProps)(ProgressFourInfoComponent);
