import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Aurobo from './Aurobo';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Plasma from '@aurobo/plasma';
import initializeApp from './initializeApp';

const theme = {
  primary: { default: '#4a148c', light: '#7c43bd', dark: '#12005e' },
  secondary: { default: '#00c853', light: '#5efc82', dark: '#009624' },
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <HashRouter>
      <Aurobo />
    </HashRouter>
  </ThemeProvider>,
  document.getElementById('root')
);

registerServiceWorker();
initializeApp();
