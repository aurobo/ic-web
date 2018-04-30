import React from 'react';
import List from './List';
import { Tissue } from '@innovic/components/shared/anatomy';

class Material extends React.Component {
  render() {
    return <Tissue list={List} />;
  }
}

export default Material;
