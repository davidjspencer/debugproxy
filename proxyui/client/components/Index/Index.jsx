/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux'

import Layout from 'components/Layout/Layout';
import HotKeysInfo from 'components/Information/HotKeysInfo'
import Header from 'components/Header/Header';
import Footer from 'components/Header/Footer';

import { showProgressOneInfo } from 'actions/info';
import { startSocket } from 'actions/socket'
import { loadIntercepts } from 'actions/intercepts'
import { addFlow } from 'actions/flows'
import { keyPress } from 'actions/keypress'
import { pingServer } from 'actions/ping'

import type { SocketActionType } from 'types/dispatch/socket'
import type { SessionActionType } from 'types/dispatch/session'
import type { FlowsActionType } from 'types/dispatch/flows'
import type { StateType } from 'types/state'

export class IndexComponent extends Component<Props> {

  componentDidMount() {
    this.props.dispatch(startSocket())
    this.props.dispatch(loadIntercepts())

    // TODO: move bootstrapping elsewhere
    if (window.requests) {
      window.requests.reverse().forEach(request => {
        this.props.dispatch(addFlow(request))
      })
    }

    setTimeout(() => this.pingServer(), 1000)
    document.addEventListener("keydown", function(e: any) {
      this.props.dispatch(keyPress(e));
    }.bind(this));
  }

  pingServer() {
    this.props.dispatch(pingServer());
    setTimeout(() => this.pingServer(), 1000 * 30);
  }

  render() {
    return (
      <div>
        <Header />
        <HotKeysInfo />
        <Layout />
        <Footer />
      </div>
     )
  };
}

type Props = {
  request: any,
  dispatch: (SocketActionType | SessionActionType | FlowsActionType) => void
}

function mapStateToProps(state: StateType) {
  return {
    request: state.flow.selected
  }
}

export default connect(mapStateToProps)(IndexComponent)
