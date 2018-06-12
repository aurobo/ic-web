import React from 'react';
import { ListCell } from '@aurobo/anatomy';

class MaterialList extends React.Component {
  render() {
    return (
      <ListCell
        name="Materials"
        getUrl="/Materials"
        importLink="/master/material/import-excel"
        deleteUrl="/Materials"
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

export default MaterialList;
