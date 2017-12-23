import 'styles/main.scss';

import 'raf/polyfill';
import React from 'react';
import { render } from 'react-dom';
import Root from './Root';
import { AppContainer } from 'react-hot-loader';
import { consoleErrorReporter } from 'console_error_reporter'
import configureStore from 'configureStore'
const store = configureStore();

const renderRoot = Component => {
  render(
    <AppContainer errorReporter={consoleErrorReporter}>
      <Component store={ store } />
    </AppContainer>,
    document.getElementById('js-main')
  )
}

renderRoot(Root);

if (module.hot) {
  module.hot.accept('./Root', () => {
    renderRoot(Root);
  });
}
