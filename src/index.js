import React from 'react';
import ReactDOM from 'react-dom';
import Aurobo from './Aurobo';
import registerServiceWorker from './registerServiceWorker';
import initializeApp from './initializeApp';
import './index.css';
import Innovic from '@aurobo/apps/innovic';

ReactDOM.render(
  <Aurobo
    organisms={[
      {
        name: 'Innovic',
        iconProps: { name: 'industry' },
        component: Innovic,
      },
    ]}
  />,
  document.getElementById('root')
);

initializeApp();
registerServiceWorker();
