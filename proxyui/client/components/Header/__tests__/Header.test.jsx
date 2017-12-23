/* @flow */

declare var jest: any;
declare var it: (name: string, body: () => any) => any;
declare var describe: (name: string, body: () => any) => any;
declare var expect: (x: any) => any;
declare var beforeEach: (x: any) => any;

jest.unmock('../Header');

import React from 'react';
import ReactDOM from 'react-dom';

import { shallow } from 'enzyme';
import { HeaderComponent } from 'components/Header/Header';


describe('Header', () => {
    it('renders header div', () => {
      const component = shallow(<HeaderComponent />)
      expect(component.find(".header").length).toEqual(1)
    });
});
