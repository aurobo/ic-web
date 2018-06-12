// import _ from 'lodash';
// import React from 'react';
// import ControlPanel from '@aurobo/components/ControlPanel';
// import styled from 'styled-components';
// import Link from 'react-router-dom/Link';
// import { Dropdown, Table, List } from 'semantic-ui-react';
// import { Page } from '@aurobo/components';
// import TableWithSorting from '@aurobo/components/TableWithSorting';
// import Api from '@aurobo/components/Api';

// const StyledDropdown = styled(Dropdown)`
//   &&& {
//     border-radius: 0;
//     padding: 8.5px;
//   }
// `;

// class ViewGoodsIssue extends React.Component {
//   state = {
//     goodsIssue: null,
//     goodsIssueItems: null,
//   };

//   handleSuccess = data => {
//     this.setState({ goodsIssue: data });
//     this.setState({ goodsIssueItems: data.goodsIssueItems });
//   };

//   handleDataChange = goodsIssueItems => {
//     this.setState({ goodsIssueItems: goodsIssueItems });
//   };

//   render() {
//     const { goodsIssue, goodsIssueItems } = this.state;
//     return (
//       <Api url={'/GoodsIssues/' + this.props.match.params.id} onSuccess={this.handleSuccess}>
//         {goodsIssue !== null ? (
//           <React.Fragment>
//             <ControlPanel title={'Goods Issues / ' + goodsIssue.key} className="no-print">
//               <StyledDropdown text="Purchase Orders" floating labeled className="icon">
//                 <Dropdown.Menu>
//                   {_.map(
//                     goodsIssue.links,
//                     link =>
//                       link.purchaseOrderId !== null ? (
//                         <Dropdown.Item key={link.purchaseOrderId}>
//                           <Link to={'/purchase/purchase-orders/' + link.purchaseOrderId}>{link.purchaseOrderKey}</Link>
//                         </Dropdown.Item>
//                       ) : (
//                         ''
//                       )
//                   )}
//                 </Dropdown.Menu>
//               </StyledDropdown>
//             </ControlPanel>
//             <Page>
//               <h1>{goodsIssue.key}</h1>
//               <List horizontal>
//                 <List.Item>
//                   <List.Header>Date</List.Header>
//                   {new Date(goodsIssue.date).toLocaleDateString()}
//                 </List.Item>
//                 <List.Item>
//                   <List.Header>Remarks</List.Header>
//                   {goodsIssue.remarks || '-'}
//                 </List.Item>
//                 <List.Item>
//                   <List.Header>Created By</List.Header>
//                   {goodsIssue.createdByUserName}
//                 </List.Item>
//                 <List.Item>
//                   <List.Header>Last Modified By</List.Header>
//                   {goodsIssue.lastModifiedByUserName}
//                 </List.Item>
//               </List>
//               <TableWithSorting
//                 sortBy="key"
//                 sortIn="desc"
//                 data={goodsIssue.goodsIssueItems}
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
//                       Required By Date
//                     </Table.HeaderCell>
//                     <Table.HeaderCell field="remainingQuantity" type="number">
//                       Remaining Quantity
//                     </Table.HeaderCell>
//                   </Table.Row>
//                 </Table.Header>
//                 <Table.Body>
//                   {_.map(
//                     goodsIssueItems,
//                     ({
//                       id,
//                       number,
//                       materialNumber,
//                       materialDescription,
//                       quantity,
//                       date,
//                       metaData: { remainingQuantity },
//                     }) => (
//                       <Table.Row key={id}>
//                         <Table.Cell>{materialNumber}</Table.Cell>
//                         <Table.Cell>{materialDescription}</Table.Cell>
//                         <Table.Cell>{quantity}</Table.Cell>
//                         <Table.Cell>{new Date(date).toLocaleDateString()}</Table.Cell>
//                         <Table.Cell>{remainingQuantity}</Table.Cell>
//                       </Table.Row>
//                     )
//                   )}
//                 </Table.Body>
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

// export default ViewGoodsIssue;
