/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import CSSTransition from 'react-transition-group/CSSTransition'

import type { StateType } from 'types/state';

export class ResumeResponseInfoComponent extends Component<Props> {

  renderContent() {
    if (this.props.show) {
      return (
        <div className="info-box" key="key" id="resume-info">
          <div className="info-box-container">
            <h1 className="title response">Resume the response</h1>
            <p>
              Return the current response to the client.
            </p>
            <p>[Shift] + r</p>
          </div>
        </div>
      )
    } else {
      return false;
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
    show: state.info.resume_response_button
  }
}

export default connect(mapStateToProps)(ResumeResponseInfoComponent);
