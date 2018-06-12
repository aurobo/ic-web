import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

const Table = props => (
  <ReactTable
    className="-highlight"
    defaultFilterMethod={(filter, row) =>
      String(row[filter.id])
        .toLowerCase()
        .includes(String(filter.value).toLowerCase())
    }
    data={props.data}
    columns={props.columns}
    defaultPageSize={25}
    pageSizeOptions={[25, 50, 75, 100]}
    showPaginationBottom
    style={{
      height: 'calc(100vh - 182px)',
    }}
    filterable={true}
  />
);

export default Table;
