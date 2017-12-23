/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux'

export class HeaderComponent extends Component<Props> {

  render() {
    return (
      <div className="header">
        Header
      </div>
    )
  }
}

type Props = {
}


export default HeaderComponent;
