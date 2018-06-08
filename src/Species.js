import React from 'react';
import { Organism, Organ, Tissue, Cell } from '@aurobo/anatomy';

const Innovic = () => <div>I am Innovic!</div>;
const Master = () => <div>I am Master!</div>;
const Sales = () => <div>I am Sales!</div>;
const Vendor = () => <div>I am Vendor!</div>;
const VendorList = () => <div>I am VendorList!</div>;
const Customer = () => <div>I am Customer!</div>;

class Species extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Organism component={Innovic} />
        <Organism component={Innovic} name="a" />
      </React.Fragment>
    );
  }
}

export default Species;
