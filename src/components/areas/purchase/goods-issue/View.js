import _ from 'lodash';
import React from 'react';
import ControlPanel from '../../../common/ControlPanel';
import styled from 'styled-components';
import Link from 'react-router-dom/Link';
import { Dropdown, Table } from 'semantic-ui-react';
import { Page } from '../../../common';
import TableWithSorting from '../../../common/TableWithSorting';
import Api from '../../../common/Api';

const StyledDropdown = styled(Dropdown)`
  &&& {
    border-radius: 0;
    padding: 8.5px;
  }
`;

class ViewGoodsIssue extends React.Component {
  state = {
    goodsIssue: null,
    goodsIssueItems: null,
  };

  handleSuccess = data => {
    this.setState({ goodsIssue: data });
    this.setState({ goodsIssueItems: data.goodsIssueItems });
  };

  handleDataChange = goodsIssueItems => {
    this.setState({ goodsIssueItems: goodsIssueItems });
  };

  render() {
    const { goodsIssue, goodsIssueItems } = this.state;
    return (
      <Api url={'/GoodsIssues/' + this.props.match.params.id} onSuccess={this.handleSuccess}>
        {goodsIssue !== null ? (
          <React.Fragment>
            <ControlPanel title={'Goods Issues / ' + goodsIssue.key} className="no-print">
              <StyledDropdown text="Purchase Orders" floating labeled className="icon">
                <Dropdown.Menu>
                  {_.map(goodsIssue.links, link => (
                    <Dropdown.Item key={link.id}>
                      <Link to={'/purchase/purchase-orders/' + link.referenceId}>{link.referenceName}</Link>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </StyledDropdown>
            </ControlPanel>
            <Page>
              <h1>{goodsIssue.key}</h1>
              <TableWithSorting
                sortBy="key"
                sortIn="desc"
                data={goodsIssue.goodsIssueItems}
                onDataChange={this.props.handleDataChange}
              >
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell field="materialNumber" type="text">
                      Material Number
                    </Table.HeaderCell>
                    <Table.HeaderCell field="quantity" type="number">
                      Quantity
                    </Table.HeaderCell>
                    <Table.HeaderCell field="requiredByDate" type="date">
                      Required By Date
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {_.map(
                    goodsIssueItems,
                    ({
                      id,
                      number,
                      materialNumber,
                      quantity,
                      requiredByDate,
                      metaData,
                      metaData: { remainingQuantity },
                    }) => (
                      <Table.Row key={id}>
                        <Table.Cell>{materialNumber}</Table.Cell>
                        <Table.Cell>{quantity}</Table.Cell>
                        <Table.Cell>{new Date(requiredByDate).toLocaleDateString()}</Table.Cell>
                      </Table.Row>
                    )
                  )}
                </Table.Body>
              </TableWithSorting>
            </Page>
          </React.Fragment>
        ) : (
          ''
        )}
      </Api>
    );
  }
}

export default ViewGoodsIssue;
