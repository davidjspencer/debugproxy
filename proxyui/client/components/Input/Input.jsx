/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { releaseInputFocus, takeInputFocus } from 'actions/focus';
import _ from 'lodash';

import type { FocusDispatchType } from 'types/dispatch/focus';
import type { StateType } from 'types/state';

export class InputComponent extends Component<Props> {

  node: any;

  blur() {
    this.node.blur()
  }

  render() {
    const updatedProps = _.clone(this.props)
    delete updatedProps.dispatch
    return (
      <input {...updatedProps}
        ref={node => this.node = node}
        onFocus={ () => this.props.dispatch(takeInputFocus()) }
        onBlur={ () =>  this.props.dispatch(releaseInputFocus()) }
      />);
  }

  componentWillUnmount() {
    // TODO: this should really check if it's currently selected.
    this.props.dispatch(releaseInputFocus())
  }
}

type Props = State & Dispatch;

type State = {
}

type Dispatch = {
  dispatch: FocusDispatchType
}

function mapStateToProps(state: StateType): State {
  return {
  }
}


function mapDispatchToProps(dispatch, props): Dispatch {
  return {
    dispatch: dispatch
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, stateProps, dispatchProps)
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps, { withRef: true })(InputComponent);
