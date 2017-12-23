/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectIntercept,
         deleteInterceptInline } from 'actions/intercepts';

import type { InterceptDispatchType } from 'types/dispatch/intercept'
import type { StateType } from 'types/state'

export class InterceptComponent extends Component<Props> {

  selectIntercept() {
    this.props.dispatch(selectIntercept(this.props.intercept));
  }

  onDelete() {
    console.log(this.props.intercept.id);
    this.props.dispatch(deleteInterceptInline(this.props.intercept, this.props.intercept.id));
  }

  renderDeleteInline() {
    return (
      <div className="inline-delete" onClick={ this.onDelete.bind(this) }>X</div>
    )
  }

  render() {
    return (
      <div className="intercept-container">
        <div className="intercept-item-name" onClick={ this.selectIntercept.bind(this) }>
          { this.props.intercept.query }
        </div>
          { this.renderDeleteInline() }
      </div>
    )
  };
}

type Props = {
  intercept: any,
  dispatch: InterceptDispatchType
}

function mapStateToProps(state: StateType) {
  return {
  }
}

export default connect(mapStateToProps)(InterceptComponent)
