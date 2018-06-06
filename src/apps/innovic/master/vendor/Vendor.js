import React from 'react';
import VendorList from './VendorList';
import VendorView from './VendorView';
import { Tissue } from '@aurobo/anatomy';

class Vendor extends React.Component {
  render() {
    return <Tissue list={VendorList} view={VendorView} />;
  }
}

export default Vendor;
