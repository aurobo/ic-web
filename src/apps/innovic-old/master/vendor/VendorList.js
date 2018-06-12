import React from 'react';
import { ListCell } from '@aurobo/anatomy';
import { Link } from 'react-router-dom';

class List extends React.Component {
  render() {
    return (
      <ListCell
        name="Vendors"
        getUrl="/Vendors"
        importLink="/master/vendor/import-excel"
        deleteUrl="/Vendors"
        tableColumns={[
          {
            Header: 'Key',
            accessor: 'key',
            Cell: ({ original }) => <Link to={'/master/vendor/' + original.id + '/view'}>{original.key}</Link>,
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
