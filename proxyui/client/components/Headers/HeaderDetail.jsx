/* @flow */

import * as React from 'react';
import Input from 'components/Input/Input';
import ReactDOM from 'react-dom';
import TextArea from 'components/Input/TextArea';
import { connect } from 'react-redux'
import { truncate } from 'lib/utils';

export class HeaderDetailComponent extends React.Component<Props> {

  node: any;

  changeName(e : SyntheticInputEvent<*>) {
    this.props.onChange(e.target.value, this.props.value);
  }

  nameKeyPress(e: any) {
    if (e.key == "Escape") {
      this.props.onCancel();
      return;
    }
    if (e.key == "Enter") {
      this.node.focus();
    }
  }

  changeValue(e : SyntheticInputEvent<>) {
    this.props.onChange(this.props.name, e.target.value);
  }

  valueKeyPress(e: any) {
    if (e.key == "Escape") {
      this.props.onCancel();
      return;
    }
    if (e.key == "Enter") {
      this.props.onSave();
      return;
    }
  }

  render() {
    if (this.props.index == null) {
      return (
        <div className="header-inputs-wrapper">
          <div className="header-name-wrapper">
            <Input autoFocus
                   className="header-name"
                   onChange={ this.changeName.bind(this) }
                   onKeyDown={ this.nameKeyPress.bind(this) }
                   value={ this.props.name } />
          </div>
          <div className="header-value-wrapper">
            <TextArea ref={node => this.node = node}
                      className="header-value"
                      onChange={ this.changeValue.bind(this) }
                      onKeyDown={ this.valueKeyPress.bind(this) }
                      value={ this.props.value } />
          </div>
        </div>
      );
    } else {
      return (
        <div className="header-inputs-wrapper">
          <div className="header-name-wrapper">
            <Input className="header-name"
                   onChange={ this.changeName.bind(this) }
                   onKeyDown={ this.nameKeyPress.bind(this) }
                   value={ this.props.name } />
          </div>
          <div className="header-value-wrapper">
            <TextArea
                autoFocus
                className="header-value"
                onChange={ this.changeValue.bind(this) }
                onKeyDown={ this.valueKeyPress.bind(this) }
                value={ this.props.value } />
          </div>
        </div>
      );
    }
  }
}

type Props = {
  editable: boolean,
  onCancel: any,
  onSave: any,
  name: string,
  value: string,
  index: any,
  onChange: any,
  children?: React$Element<any>,
}


export default HeaderDetailComponent;
