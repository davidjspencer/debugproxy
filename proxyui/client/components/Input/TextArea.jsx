/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { releaseInputFocus, takeInputFocus } from 'actions/focus';
import _ from 'lodash';

import type { FocusDispatchType } from 'types/dispatch/focus'
import type { StateType } from 'types/state';

export class TextAreaComponent extends Component<Props> {

  render() {
    const updatedProps = _.clone(this.props)
    delete updatedProps.dispatch
    return (
      <textarea {...updatedProps}
        onFocus={ () => this.props.dispatch(takeInputFocus()) }
        onBlur={ () =>  this.props.dispatch(releaseInputFocus()) }
      />);
  }
}

type Props = {
  dispatch: FocusDispatchType
};

function mapStateToProps(state: StateType) {
  return {
  }
}

export default connect(mapStateToProps)(TextAreaComponent);

