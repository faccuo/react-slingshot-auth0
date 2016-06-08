/* eslint-disable import/default */

import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import './styles/styles.scss';
require('./favicon.ico'); // Tell webpack to load favicon.ico

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import App from './containers/App';

const store = configureStore();
const muiTheme = getMuiTheme({
  appBar: {
    color: '#4285f4'
  },
  raisedButton: {
    primaryColor: '#4285f4',
    primaryTextColor: 'white'
  }
});

render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <App/>
    </MuiThemeProvider>
  </Provider>, document.getElementById('app')
);
