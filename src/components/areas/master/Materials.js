import _ from 'lodash';
import React from 'react';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table';
import ControlPanel from '../../common/ControlPanel';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup/Popup';
import { api } from '../../common/Utilities';
import { FlatButton } from '../../common';
import TableWithSorting from '../../common/TableWithSorting';

class Materials extends React.Component {
  state = {
    data: null,
    loading: true,
  };

  componentDidMount() {
    let config = {
      onDownloadProgress: progressEvent => this.setState({ loading: true }),
    };
    api
      .get('/materials', config)
      .then(response => {
        this.setState({ data: response.data, loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  }

  handleDataChange = data => {
    this.setState({ data: data });
  };

  render() {
    const { data } = this.state;
    return (
      <div>
        <ControlPanel title="Materials" loading={this.state.loading}>
          <Popup
            inverted
            trigger={
              <span>
                <FlatButton size="tiny" primary disabled>
                  Create
                </FlatButton>
              </span>
            }
            content="Temporarily inactive."
          />
        </ControlPanel>
        <TableWithSorting sortBy="key" sortIn="desc" data={data} onDataChange={this.handleDataChange}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell field="key" type="text">
                Key
              </Table.HeaderCell>
              <Table.HeaderCell field="number" type="text">
                Number
              </Table.HeaderCell>
              <Table.HeaderCell field="quantity" type="number">
                Quantity
              </Table.HeaderCell>
              <Table.HeaderCell field="description" type="text">
                Description
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(data, ({ id, key, description, number, quantity }) => (
              <Table.Row key={id}>
                <Table.Cell>{key}</Table.Cell>
                <Table.Cell>{number}</Table.Cell>
                <Table.Cell>{quantity}</Table.Cell>
                <Table.Cell>{description}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </TableWithSorting>
      </div>
    );
  }
}

export default Materials;
