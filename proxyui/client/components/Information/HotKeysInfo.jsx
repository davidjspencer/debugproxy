/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import CSSTransition from 'react-transition-group/CSSTransition'

import type { StateType } from 'types/state';

export class HotKeysInfoComponent extends Component<Props> {

  renderContent() {
    if (this.props.show) {
      return (
        <div className="hotkeys-overlay" key="key">
          <div>
            <div className="hotkeys-info">
              <h1>Keyboard Shortcuts</h1>
              <div className="hotkeys-table">
                <div className="hotkeys-column">
                  <div>
                    <span>escape&nbsp;</span>
                    Go back
                  </div>
                  <div>
                    <span>Shift ?</span>
                    Help (this screen)
                  </div>
                  <div>
                    <span>Shift c</span>
                    Clear all
                  </div>
                  <div>
                    <span>Shift r</span>
                    Resume current request
                  </div>
                  <div>
                    <span>h</span>
                    Previous tab
                  </div>
                  <div>
                    <span>l</span>
                    Next tab
                  </div>
                </div>
                <div className="hotkeys-column">
                  <div>
                    <span>j</span>
                    Previous request
                  </div>
                  <div>
                    <span>k</span>
                    Next request
                  </div>
                </div>
              </div>
            </div>
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
    show: state.info.hotkeys
  }
}

export default connect(mapStateToProps)(HotKeysInfoComponent);
