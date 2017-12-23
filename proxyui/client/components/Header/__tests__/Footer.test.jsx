/* @flow */

declare var jest: any;
declare var it: (name: string, body: () => any) => any;
declare var describe: (name: string, body: () => any) => any;
declare var expect: (x: any) => any;
declare var beforeEach: (x: any) => any;

jest.unmock('../Footer.jsx');

import React from 'react';
import ReactDOM from 'react-dom';

import { shallow } from 'enzyme';
import { FooterComponent } from 'components/Header/Footer';


describe('Footer', () => {
    it('renders footer text', () => {
      const component = shallow(<FooterComponent />)
      expect(component.find(".footer").length).toEqual(1);
    });
});
