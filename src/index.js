/* eslint-disable import/default */
/* eslint-disable import/no-named-as-default */

import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import './styles/styles.scss';
require('./favicon.ico'); // Tell webpack to load favicon.ico
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './containers/App';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const store = configureStore();
const muiTheme = getMuiTheme({
  appBar: {
    color: '#1c0c2a'
  },
  raisedButton: {
    primaryColor: '#1c0c2a',
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
