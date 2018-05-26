import React from 'react';
import { ListCell } from '@innovic/components/shared/anatomy';

class List extends React.Component {
  render() {
    return (
      <ListCell
        name="Materials"
        getUrl="/Materials"
        importLink="/master/material/import-excel"
        tableColumns={[
          {
            Header: 'Key',
            accessor: 'key',
          },
          {
            Header: 'Number',
            accessor: 'number',
          },
          {
            Header: 'Description',
            accessor: 'description',
          },
          {
            Header: 'Quantity',
            accessor: 'quantity',
          },
        ]}
      />
    );
  }
}

export default List;
