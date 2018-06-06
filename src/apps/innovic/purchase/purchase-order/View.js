// import _ from 'lodash';
// import React from 'react';
// import ControlPanel from '@aurobo/components/ControlPanel';
// import styled from 'styled-components';
// import Link from 'react-router-dom/Link';
// import { Dropdown, Table } from 'semantic-ui-react';
// import { Page } from '@aurobo/components';
// import TableWithSorting from '@aurobo/components/TableWithSorting';
// import Api from '@aurobo/components/Api';

// const StyledDropdown = styled(Dropdown)`
//   &&& {
//     border-radius: 0;
//     padding: 8.5px;
//   }
// `;

// class ViewPurchaseOrder extends React.Component {
//   state = {
//     purchaseOrder: {
//       links: [],
//       metaData: {},
//     },
//     purchaseOrderItems: null,
//   };

//   handleSuccess = data => {
//     this.setState({ purchaseOrder: data });
//     this.setState({ purchaseOrderItems: data.purchaseOrderItems });
//   };

//   handleDataChange = purchaseOrderItems => {
//     this.setState({ purchaseOrderItems: purchaseOrderItems });
//   };

//   render() {
//     const { purchaseOrder, purchaseOrderItems } = this.state;

//     return (
//       <Api url={'/PurchaseOrders/' + this.props.match.params.id} onSuccess={this.handleSuccess}>
//         {purchaseOrder !== null ? (
//           <React.Fragment>
//             <ControlPanel title={'Purchase Orders / ' + purchaseOrder.key} className="no-print">
//               <StyledDropdown text="Purchase Requests" floating labeled className="icon">
//                 <Dropdown.Menu>
//                   {_.map(purchaseOrder.purchaseRequests, pr => (
//                     <Dropdown.Item key={pr.id}>
//                       <Link to={'/purchase/purchase-requests/' + pr.id}>{pr.key}</Link>
//                     </Dropdown.Item>
//                   ))}
//                 </Dropdown.Menu>
//               </StyledDropdown>
//               <StyledDropdown text="Goods Receipts" floating labeled className="icon">
//                 <Dropdown.Menu>
//                   {_.map(purchaseOrder.goodsReceipts, gr => (
//                     <Dropdown.Item key={gr.id}>
//                       <Link to={'/purchase/goods-receipts/' + gr.id}>{gr.key}</Link>
//                     </Dropdown.Item>
//                   ))}
//                 </Dropdown.Menu>
//               </StyledDropdown>
//               <StyledDropdown text="Goods Issues" floating labeled className="icon">
//                 <Dropdown.Menu>
//                   {_.map(
//                     purchaseOrder.links,
//                     link =>
//                       link.goodsIssueId !== null ? (
//                         <Dropdown.Item key={link.goodsIssueId}>
//                           <Link to={'/purchase/goods-issues/' + link.goodsIssueId}>{link.goodsIssueKey}</Link>
//                         </Dropdown.Item>
//                       ) : (
//                         ''
//                       )
//                   )}
//                 </Dropdown.Menu>
//               </StyledDropdown>
//             </ControlPanel>
//             <Page>
//               <h1>{purchaseOrder.key}</h1>
//               <TableWithSorting
//                 sortBy="key"
//                 sortIn="desc"
//                 data={purchaseOrder.purchaseOrderItems}
//                 onDataChange={this.props.handleDataChange}
//               >
//                 <Table.Header>
//                   <Table.Row>
//                     <Table.HeaderCell field="materialNumber" type="text">
//                       Material Number
//                     </Table.HeaderCell>
//                     <Table.HeaderCell field="materialDescription" type="text">
//                       Material Description
//                     </Table.HeaderCell>
//                     <Table.HeaderCell field="quantity" type="number">
//                       Quantity
//                     </Table.HeaderCell>
//                     <Table.HeaderCell field="date" type="date">
//                       Unit Price
//                     </Table.HeaderCell>
//                     <Table.HeaderCell field="amount" type="number">
//                       Total Price
//                     </Table.HeaderCell>
//                     <Table.HeaderCell field="date" type="date">
//                       Date
//                     </Table.HeaderCell>
//                     <Table.HeaderCell field="remainingQuantity" type="number">
//                       Remaining Quantity
//                     </Table.HeaderCell>
//                   </Table.Row>
//                 </Table.Header>
//                 <Table.Body>
//                   {_.map(
//                     purchaseOrderItems,
//                     ({
//                       id,
//                       number,
//                       materialNumber,
//                       materialDescription,
//                       quantity,
//                       date,
//                       unitPrice,
//                       metaData: { remainingQuantity, amount },
//                     }) => (
//                       <Table.Row key={id}>
//                         <Table.Cell>{materialNumber}</Table.Cell>
//                         <Table.Cell>{materialDescription}</Table.Cell>
//                         <Table.Cell>{quantity}</Table.Cell>
//                         <Table.Cell>{unitPrice}</Table.Cell>
//                         <Table.Cell>{amount}</Table.Cell>
//                         <Table.Cell>{new Date(date).toLocaleDateString()}</Table.Cell>
//                         <Table.Cell>{remainingQuantity}</Table.Cell>
//                       </Table.Row>
//                     )
//                   )}
//                 </Table.Body>
//                 <Table.Footer>
//                   <Table.Row>
//                     <Table.HeaderCell />
//                     <Table.HeaderCell />
//                     <Table.HeaderCell />
//                     <Table.HeaderCell />
//                     <Table.HeaderCell />
//                     <Table.HeaderCell />
//                     <Table.HeaderCell>
//                       <ul>
//                         <h3>Summary:</h3>
//                         <li>Total Quantity: {_.sumBy(purchaseOrder.purchaseOrderItems, 'quantity')}</li>
//                         <li>Total Amount: {_.sumBy(_.map(purchaseOrder.purchaseOrderItems, 'metaData'), 'amount')}</li>
//                         <li>Remaining Quantity: {purchaseOrder.metaData.totalRemainingQuantity}</li>
//                         <li>Remaining Amount: {purchaseOrder.metaData.totalRemainingAmount}</li>
//                       </ul>
//                     </Table.HeaderCell>
//                   </Table.Row>
//                 </Table.Footer>
//               </TableWithSorting>
//             </Page>
//           </React.Fragment>
//         ) : (
//           ''
//         )}
//       </Api>
//     );
//   }
// }

// export default ViewPurchaseOrder;
