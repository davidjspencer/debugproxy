/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createIntercept } from 'actions/intercepts';
import { showInterceptInfo } from 'actions/info';

import InterceptDetail from 'components/Intercepts/InterceptDetail';
import InterceptList from 'components/Intercepts/InterceptList';
import InterceptInfo from 'components/Information/InterceptInfo';

import type { InterceptDispatchType } from 'types/dispatch/intercept'
import type { StateType } from 'types/state'

export class InterceptContainerComponent extends Component<Props> {

  pause() {
    return (
      <svg viewBox="0 0 52 52">
        <rect x="21" y="21.6" className="pause-left-rect" width="4.1" height="12"/>
        <rect x="26.9" y="21.6" className="pause-right-rect" width="4.1" height="12"/>
      </svg>
    )
  }

  render() {
    if (this.props.selected) {
      return (
        <div className="intercepts">
          <InterceptDetail />
          <InterceptList />
        </div>
      )
    }

    if (this.props.loading_error) {
      return (
        <div className="intercepts">
          <div className="error">
            { "Error loading intercepts" }
          </div>
        </div>
      )
    }
    if (this.props.loading) {
      return (
        <div className="intercepts">
          <div className="loading">
            { "Loading intercepts" }
          </div>
        </div>
      )
    }

    return (
      <div className="intercepts">
        <div className="titles">
          Intercepts
        </div>
        <div className="intercept-button-container">
          <button className="intercept-button"
                  onMouseOver={ () => this.props.dispatch(showInterceptInfo(true)) }
                  onMouseOut={ () => this.props.dispatch(showInterceptInfo(false)) }
                  onClick={ () => {
                    this.props.dispatch(showInterceptInfo(false));
                    this.props.dispatch(createIntercept());
                  }}>
            { this.pause() }
          </button>
          <InterceptInfo />
        </div>
        <InterceptList />
      </div>
    )
  };
}

type Props = {
  dispatch: InterceptDispatchType
}

function mapStateToProps(state: StateType) {
  return {
    loading: state.intercepts.loading,
    loading_error: state.intercepts.loading_error,
    selected: state.intercepts.selected
  }
}


export default connect(mapStateToProps)(InterceptContainerComponent)
