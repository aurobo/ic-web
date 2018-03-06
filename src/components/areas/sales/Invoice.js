import React from "react";

class Invoice extends React.Component {
  state = {
    loading: true,
    invoice: {
      key: ""
    }
  };

  componentWillMount() {
    let config = {
      onDownloadProgress: progressEvent => this.setState({ loading: false })
    };
    api
      .get("/invoices/" + this.props.match.params.id, config)
      .then(response => {
        this.setState({
          invoiceItems: response.data.invoiceItems,
          invoice: response.data
        });
      })
      .catch(error => {});
  }

  render() {
    return (
      <div>
        <ControlPanel
          title={"Invoices / " + this.state.invoice.key}
          loading={this.state.loading}
          className="no-print"
        >
          <FlatButton primary size="tiny" onClick={this.handleSubmitInvoice}>
            Submit
          </FlatButton>
        </ControlPanel>
        <StyledTable sortable celled fixed compact selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">Select</Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "number" ? direction : null}
                onClick={this.handleSort("number")}
              >
                Item Number
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "materialNumber" ? direction : null}
                onClick={this.handleSort("materialNumber")}
              >
                Material Number
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "description" ? direction : null}
                onClick={this.handleSort("description")}
              >
                Description
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "unitPrice" ? direction : null}
                onClick={this.handleSort("unitPrice")}
              >
                Unit Price
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "quantity" ? direction : null}
                onClick={this.handleSort("quantity")}
              >
                Quantity
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={column === "value" ? direction : null}
                onClick={this.handleSort("value")}
              >
                Value
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {_.map(
              salesOrderItems,
              ({
                id,
                number,
                materialNumber,
                description,
                unitPrice,
                metaData,
                invoicedQuantity = metaData.remainingQuantity,
                value,
                valid = true,
                checked = false
              }) => (
                <Table.Row key={id}>
                  <Table.Cell textAlign="center">
                    <Checkbox
                      disabled={!valid}
                      checked={checked && valid}
                      onChange={(e, data) => this.handleItemCheck(e, data, id)}
                    />
                  </Table.Cell>
                  <Table.Cell>{number}</Table.Cell>
                  <Table.Cell>{materialNumber}</Table.Cell>
                  <Table.Cell>{description}</Table.Cell>
                  <Table.Cell>{unitPrice}</Table.Cell>
                  <Table.Cell>
                    <Input
                      label={{
                        basic: true,
                        content: metaData.remainingQuantity - invoicedQuantity
                      }}
                      labelPosition="right"
                      value={invoicedQuantity}
                      onChange={e => this.handleQuantityChange(e, id)}
                      size="mini"
                      error={!valid}
                    />
                  </Table.Cell>
                  <Table.Cell>{value}</Table.Cell>
                </Table.Row>
              )
            )}
          </Table.Body>
        </StyledTable>
      </div>
    );
  }
}

export default Invoice;
