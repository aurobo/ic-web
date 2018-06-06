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

// class ViewGoodsReceipt extends React.Component {
//   state = {
//     goodsReceipt: null,
//     goodsReceiptItems: null,
//   };

//   handleSuccess = data => {
//     this.setState({ goodsReceipt: data });
//     this.setState({ goodsReceiptItems: data.goodsReceiptItems });
//   };

//   handleDataChange = goodsReceiptItems => {
//     this.setState({ goodsReceiptItems: goodsReceiptItems });
//   };

//   render() {
//     const { goodsReceipt, goodsReceiptItems } = this.state;
//     return (
//       <Api url={'/GoodsReceipts/' + this.props.match.params.id} onSuccess={this.handleSuccess}>
//         {goodsReceipt !== null ? (
//           <React.Fragment>
//             <ControlPanel title={'Goods Receipts / ' + goodsReceipt.key} className="no-print">
//               <StyledDropdown text="Purchase Orders" floating labeled className="icon">
//                 <Dropdown.Menu>
//                   {_.map(goodsReceipt.purchaseOrders, po => (
//                     <Dropdown.Item key={po.id}>
//                       <Link to={'/purchase/purchase-orders/' + po.id}>{po.key}</Link>
//                     </Dropdown.Item>
//                   ))}
//                 </Dropdown.Menu>
//               </StyledDropdown>
//               <StyledDropdown text="Goods Issues" floating labeled className="icon">
//                 <Dropdown.Menu>
//                   {_.map(goodsReceipt.goodsIssues, gi => (
//                     <Dropdown.Item key={gi.id}>
//                       <Link to={'/purchase/goods-issues/' + gi.id}>{gi.key}</Link>
//                     </Dropdown.Item>
//                   ))}
//                 </Dropdown.Menu>
//               </StyledDropdown>
//             </ControlPanel>
//             <Page>
//               <h1>{goodsReceipt.key}</h1>
//               <TableWithSorting
//                 sortBy="key"
//                 sortIn="desc"
//                 data={goodsReceipt.goodsReceiptItems}
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
//                       Date
//                     </Table.HeaderCell>
//                   </Table.Row>
//                 </Table.Header>
//                 <Table.Body>
//                   {_.map(
//                     goodsReceiptItems,
//                     ({
//                       id,
//                       number,
//                       materialNumber,
//                       materialDescription,
//                       quantity,
//                       date,
//                       metaData,
//                       metaData: { remainingQuantity },
//                     }) => (
//                       <Table.Row key={id}>
//                         <Table.Cell>{materialNumber}</Table.Cell>
//                         <Table.Cell>{materialDescription}</Table.Cell>
//                         <Table.Cell>{quantity}</Table.Cell>
//                         <Table.Cell>{new Date(date).toLocaleDateString()}</Table.Cell>
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

// export default ViewGoodsReceipt;
