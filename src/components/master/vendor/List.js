import React from 'react';
import { ListCell } from '@innovic/components/shared/anatomy';

class List extends React.Component {
  render() {
    return (
      <ListCell
        name="Vendors"
        getUrl="/Vendors"
        importLink="/master/vendor/import-excel"
        tableColumns={[
          {
            Header: 'Key',
            accessor: 'key',
          },
          {
            Header: 'Name',
            accessor: 'name',
          },
        ]}
      />
    );
  }
}

export default List;
