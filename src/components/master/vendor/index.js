import React from 'react';
import List from './List';
import View from './View';
import { Tissue } from '@innovic/components/shared/anatomy';

class Vendor extends React.Component {
  render() {
    return <Tissue list={List} view={View} />;
  }
}

export default Vendor;
