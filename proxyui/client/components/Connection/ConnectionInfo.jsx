/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux'

import { showConnectionInfo } from 'actions/layout'

import type { InfoDispatchType } from 'types/dispatch/info';
import type { StateType } from 'types/state';


export class ConnectionInfoComponent extends Component<Props> {

  noRequestsInfo() {
    if (!this.props.seen_request) {
      return (
        <h3 className="no-request-title">{ "No requests have been received yet" }</h3>
      )
    }
  }

  curlString() {
    const proxy = new URL(window.proxy_url)
    const proxy_url = proxy.username || proxy.password ?
      `${proxy.username}:${proxy.password}@${proxy.hostname}:${proxy.port}` :
      `${proxy.hostname}:${proxy.port}`

    return `curl http://www.example.com --proxy ${proxy_url}`
  }

  credentials(proxy: URL) {
    if (proxy.username || proxy.password) {
      return (
        <div>
          <p className="username">
            Username: <span>{ proxy.username }</span>
          </p>
          <p className="password">
            Password: <span>{ proxy.password }</span>
          </p>
        </div>
      )
    } else {
      return (null)
    }
  }

  render() {
    var proxy = new URL(window.proxy_url)

    return (
      <div className="onboarding">

        <div className="onboarding-container">
           { this.noRequestsInfo() }
          <p>
            Use the following connection details in conjunction with the device configuration guides [links below] to configure your device:
          </p>
          <div className="session-info">
            { this.credentials(proxy) }
            <p className="server">
              Proxy Server: <span>{ proxy.hostname }</span>
            </p>
            <p className="port">
              Port: <span>{ proxy.port }</span>
            </p>
          </div>

          <p>
            If you have the <span className="curl">curl</span> program installed on your computer, you can
            test if the proxy works with this command:
          </p>
          <code className="curl">
            { this.curlString() }
          </code>
          <div className="guides">
            <a className="link-buttons yello-link" href="/help/curl" target="_blank">cURL</a>
            <a className="link-buttons green-link" href="/help/android" target="_blank">Android Config</a>
            <a className="link-buttons blue-link" href="/help/ios" target="_blank">iOS Config</a>
            <div className="hide" >
              <a className="link-buttons yellow-link" onClick={ () => this.props.dispatch(showConnectionInfo(false)) }>Ok, got it</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

type Props = {
  dispatch: InfoDispatchType
};

function mapStateToProps(state: StateType) {
  return {
    seen_request: state.layout.seen_request
  }
}

export default connect(mapStateToProps)(ConnectionInfoComponent);
