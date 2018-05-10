import React from 'react';
import { Cell } from '@innovic/components/shared/anatomy';
import { FlatButton, Api } from '@innovic/components/shared';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Link } from 'react-router-dom';

class ListCell extends React.Component {
  state = {
    data: [],
  };

  handleSuccess = data => {
    this.setState({ data: data });
  };

  render() {
    const { name, tableColumns, getUrl, importLink } = this.props;
    const { data } = this.state;
    return (
      <Api url={getUrl} onSuccess={this.handleSuccess}>
        <Cell
          name={name}
          renderControlPanel={() => (
            <React.Fragment>
              <FlatButton size="tiny" primary>
                Create
              </FlatButton>
              {importLink ? (
                <Link to={importLink}>
                  <FlatButton size="tiny">Import</FlatButton>
                </Link>
              ) : (
                ''
              )}
            </React.Fragment>
          )}
          renderBody={() => (
            <ReactTable
              className="-highlight"
              defaultFilterMethod={(filter, row) =>
                String(row[filter.id])
                  .toLowerCase()
                  .includes(String(filter.value).toLowerCase())
              }
              data={data}
              columns={tableColumns}
              defaultPageSize={10}
              filterable={true}
              defaultSorted={[
                {
                  id: 'key',
                  desc: true,
                },
              ]}
            />
          )}
        />
      </Api>
    );
  }
}

export default ListCell;
