/* @flow */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'

import { prettyUrl, truncate } from 'lib/utils';
import { changeQuery } from 'actions/filter';

import type { FilterDispatchType } from 'types/dispatch/filter';
import type { StateType } from 'types/state';

import Input from 'components/Input/Input';



export class FilterComponent extends Component<Props> {

  node: any;

  onChange(e : SyntheticInputEvent<*>) {
    this.props.dispatch(changeQuery(e.target.value));
  }

  onKeyPress(e: any) {
    if (e.key == "Escape") {
      this.node.getWrappedInstance().blur()
    }
    if (e.key == "Enter") {
      this.node.getWrappedInstance().blur()
    }
  }

  render() {
    return (
      <div className="filters">
        <Input ref={node => this.node = node}
          placeholder="Filter Request List"
          onKeyDown={ (e) => this.onKeyPress(e) }
          onChange={ (e) => this.onChange(e) }
          value={ this.props.query }
        />
      </div>
    )
  }
}

type Props = {
  query: string,
  dispatch: FilterDispatchType
};

function mapStateToProps(state: StateType) {
  return {
    query: state.filter.query
  }
}

export default connect(mapStateToProps)(FilterComponent);
