import _ from "lodash";
import React from "react";
import Table from "semantic-ui-react/dist/commonjs/collections/Table/Table";
import ControlPanel from "../../common/ControlPanel";
import Popup from "semantic-ui-react/dist/commonjs/modules/Popup/Popup";
import { api } from "../../common/Utilities";
import { FlatButton, StyledTable } from "../../common";

class Customers extends React.Component {
  state = {
    column: null,
    data: null,
    direction: null,
    loading: true
  };

  componentDidMount() {
    let config = {
      onDownloadProgress: progressEvent => this.setState({ loading: true })
    };
    api
      .get("/customers", config)
      .then(response => {
        this.setState({ data: response.data, loading: false });
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: "ascending"
      });

      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending"
    });
  };

  render() {
    const { column, data, direction } = this.state;
    return (
      <div>
        <ControlPanel title="Customers" loading={this.state.loading}>
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
        <StyledTable sortable celled fixed compact selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={column === "key" ? direction : null}
                onClick={this.handleSort("key")}
              >
                Key
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "name" ? direction : null}
                onClick={this.handleSort("name")}
              >
                Name
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(data, ({ id, key, name }) => (
              <Table.Row key={id}>
                <Table.Cell>{key}</Table.Cell>
                <Table.Cell>{name}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </StyledTable>
      </div>
    );
  }
}

export default Customers;
