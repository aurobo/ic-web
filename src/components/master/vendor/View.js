import React from 'react';
import { ViewCell } from '@innovic/components/shared/anatomy';

class View extends React.Component {
  render() {
    return <ViewCell name="Vendors" list={[{ title: 'Name', accessor: 'name' }]} />;
  }
}

export default View;
