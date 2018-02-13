import _ from "lodash";
import React from "react";
import Table from "semantic-ui-react/dist/commonjs/collections/Table/Table";
import ControlPanel from "../../common/ControlPanel";
import Popup from "semantic-ui-react/dist/commonjs/modules/Popup/Popup";
import { FlatButton, StyledTable } from "../../thematic/index";
import { Link } from "react-router-dom";
import api from "../../../Api";

class SalesOrders extends React.Component {
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
      .get("/salesorders", config)
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
        <ControlPanel title="Sales Orders" loading={this.state.loading}>
          <Popup
            inverted
            trigger={
              <span>
                <FlatButton size="tiny" primary disabled>
                  Create
                </FlatButton>
              </span>
            }
            content="Temporarily inactive. Use import method instead."
          />
          <Link to="/sales/import-excel">
            <FlatButton size="tiny">Import</FlatButton>
          </Link>
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
                sorted={column === "orderDate" ? direction : null}
                onClick={this.handleSort("orderDate")}
              >
                Order Date
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "customerName" ? direction : null}
                onClick={this.handleSort("customerName")}
              >
                Customer Name
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(data, ({ id, key, orderDate, customerName }) => (
              <Table.Row key={id}>
                <Table.Cell selectable>
                  <Link to={"/sales/sales-orders/" + id}>{key}</Link>
                </Table.Cell>
                <Table.Cell>
                  {new Date(orderDate).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>{customerName}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </StyledTable>
      </div>
    );
  }
}

export default SalesOrders;
