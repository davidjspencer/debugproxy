/* @flow */

declare var jest: any;
declare var it: (name: string, body: () => any) => any;
declare var describe: (name: string, body: () => any) => any;
declare var expect: (x: any) => any;
declare var beforeEach: (x: any) => any;

jest.unmock('../Index.jsx');

import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import { IndexComponent } from 'components/Index/Index';
import Header from 'components/Header/Header';
import Footer from 'components/Header/Footer';

describe('IndexComponent', () => {

  describe("with user", () => {

    var component;

    beforeEach(function() {
      const dispatch = function(request) { };
      component = shallow(
        <IndexComponent request = { null } dispatch={ dispatch } />
      )
    })

    it('should render header component', () => {
      expect(component.find(Header).length).toEqual(1)
    });

    it('should render footer component', () => {
      expect(component.find(Footer).length).toEqual(1)
    });

  });


});
