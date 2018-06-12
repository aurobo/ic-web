import React from 'react';
import { Organ } from '@aurobo/anatomy';
import Master from './master';
import Sales from './sales';

const Innovic = props => {
  return (
    <div>
      I am Innovic
      <Organ component={Sales} />
      <Organ component={Master} />
    </div>
  );
};

export default Innovic;
