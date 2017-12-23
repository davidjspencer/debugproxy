/* @flow */

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Index from 'components/Index/Index';

export class RootComponent extends Component<Props> {

  render() {
    return (
      <Provider store={ this.props.store }>
        <Index />
      </Provider>
    )
  }
}

type Props = {
  store: any
}

export default RootComponent
