/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux'

import type { SessionStateType } from 'types/state/session';


export class ExpiredSessionComponent extends Component<Props> {

  render() {
    if (this.props.active) {
      return (
        null
      );
    }
    return (
      <div className="expired-session">
        This proxy session has expired and will not accept any more requests.
        Please visit the <a href="/">home page</a> renable the session or create a new one.
      </div>
    )
  }
}

type Props = {
  active: boolean
};

function mapStateToProps(state: SessionStateType) {
  return {
    active: state.session.active
  }
}

export default connect(mapStateToProps)(ExpiredSessionComponent);
