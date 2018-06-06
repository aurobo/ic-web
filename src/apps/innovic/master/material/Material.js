import React from 'react';
import MaterialList from './MaterialList';
import { Tissue } from '@aurobo/anatomy';

class Material extends React.Component {
  render() {
    return <Tissue list={MaterialList} />;
  }
}

export default Material;
