/* @flow */

import React, { Component } from 'react';
import { connect } from 'react-redux'
import { updateRequestBody, loadRequest } from 'actions/request'
import { releaseInputFocus, takeInputFocus } from 'actions/focus';
import AceEditor from 'react-ace';
import { canEditRequest } from 'lib/utils';

import * as ace from 'brace';
import 'brace/mode/html';
import 'brace/theme/solarized_dark';
import 'brace/theme/solarized_light';

import type { StateType } from 'types/state';

export class BodyInfoComponent extends Component<Props> {

  constructor() {
    super();
  }

  render() {
    return (
      <div>
      "Body Info!"
      </div>
    )
  }
}

type Props = {
  request: any,
  loading_request: boolean,
  request_data: string
};

function mapStateToProps(state : StateType) {
  return {
    request_meta: state.request.request_data,
  }
}

export default connect(mapStateToProps)(BodyInfoComponent);
