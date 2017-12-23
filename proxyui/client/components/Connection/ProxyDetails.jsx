/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { showAddressInfo } from 'actions/info'
import AddressInfo from 'components/Information/AddressInfo';
import ConnectionInfoButton from 'components/Connection/ConnectionInfoButton';
import { parseProxyUrl } from 'lib/utils'

import type { InfoDispatchType } from 'types/dispatch/info';
import type { StateType } from 'types/state';


export class ProxyDetailsComponent extends Component<Props> {

  connection_info() {
    var proxy = new URL(window.proxy_url)
    if (proxy.username || proxy.password) {
      return (
        <div>
          <span className="username">{ proxy.username }</span>
          :
          <span className="password">{ proxy.password }</span>
          @
          <span className="server">{ proxy.hostname }</span>
          :
          <span className="port">{ proxy.port }</span>
        </div>
      );
    } else {
      return (
        <div>
          <span className="server">{ proxy.hostname }</span>
          :
          <span className="port">{ proxy.port }</span>
          </div>
        );
    }
  }

  render() {
    return (
      <div className="connection-split">
        <div className="proxy-details">
          <span
            onMouseOver={ () => this.props.dispatch(showAddressInfo(true))}
            onMouseOut={ () => this.props.dispatch(showAddressInfo(false))}>
              { this.connection_info() }
          </span>
          <AddressInfo />
        </div>
        <ConnectionInfoButton />
      </div>
    )
  }
}

type Props = {
  dispatch: InfoDispatchType
};

function mapStateToProps(state: StateType) {
  return {
  }
}

export default connect(mapStateToProps)(ProxyDetailsComponent);
