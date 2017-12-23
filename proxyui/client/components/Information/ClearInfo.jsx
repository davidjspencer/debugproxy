/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import CSSTransition from 'react-transition-group/CSSTransition'

import type { StateType } from 'types/state';

export class ClearInfoComponent extends Component<Props> {

  renderContent() {
    if (this.props.show) {
      return (
        <div className="info-box-right" key="key" id="clear-info">
          <div className="info-box-container">
            <h1 className="title clear">Clear all Requests</h1>
            <p>Clears all requests in the Request List. Request List only shows the most 100 recent Requests.
            </p>
            <p>[Shift] + c</p>
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
    show: state.info.clear_button
  }
}

export default connect(mapStateToProps)(ClearInfoComponent);
