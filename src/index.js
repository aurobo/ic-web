import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '@innovic/components/shared';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import Raven from 'raven-js';

if (process.env.NODE_ENV === 'development') {
  if (process.env.REACT_APP_SENTRY) {
    Raven.config(process.env.REACT_APP_SENTRY).install();
  } else {
    // Extract errors as constants in another file
    console.log(
      '%cHey you awesome contributor, did you know you can set REACT_APP_SENTRY environment variable to receive reports while in development environment?',
      'color: #fff; background: blue'
    );
    console.log(
      '%cCheckout aurobo contributor FAQs/Guide on how to setup local environment variables.',
      'color: #fff; background: blue'
    );
    console.log('%cYou should checkout https://sentry.io', 'color: #fff; background: blue');
  }
}
// Use environment variables
firebase.initializeApp({
  apiKey: 'AIzaSyAyip2obosWwgzAx7XvXTH7e2O6ms-kUMw',
  authDomain: 'aurobo-a6fc8.firebaseapp.com',
  databaseURL: 'https://aurobo-a6fc8.firebaseio.com',
  projectId: 'aurobo-a6fc8',
  storageBucket: 'aurobo-a6fc8.appspot.com',
  messagingSenderId: '406509490895',
});

firebase
  .auth()
  .signInWithEmailAndPassword('admin@aurobo.in', '123456')
  .catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
  });

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <HashRouter>
      <App />
    </HashRouter>
  </ThemeProvider>,
  document.getElementById('root')
);
registerServiceWorker();
