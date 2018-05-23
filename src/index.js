import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '@innovic/components/shared';
import firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyAyip2obosWwgzAx7XvXTH7e2O6ms-kUMw',
  authDomain: 'aurobo-a6fc8.firebaseapp.com',
  databaseURL: 'https://aurobo-a6fc8.firebaseio.com',
  projectId: 'aurobo-a6fc8',
  storageBucket: 'aurobo-a6fc8.appspot.com',
  messagingSenderId: '406509490895',
};

firebase.initializeApp(config);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <HashRouter>
      <App />
    </HashRouter>
  </ThemeProvider>,
  document.getElementById('root')
);
registerServiceWorker();
