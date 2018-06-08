import React from 'react';
import ReactDOM from 'react-dom';
import Aurobo from './Aurobo';
import registerServiceWorker from './registerServiceWorker';
import initializeApp from './initializeApp';
import './index.css';

ReactDOM.render(<Aurobo />, document.getElementById('root'));

initializeApp();
registerServiceWorker();
