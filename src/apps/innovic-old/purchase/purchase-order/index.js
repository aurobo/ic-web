// import React from 'react';
// import Api from '@aurobo/components/Api';
// import { Route, Switch } from 'react-router-dom';
// import List from './List';
// import ViewPurchaseOrder from './View';
// import CreateFromPurchaseOrders from '../goods-receipt/CreateFromPurchaseOrders';

// class PurchaseOrder extends React.Component {
//   state = {
//     data: null,
//     selectedRows: [],
//   };

//   handleDataChange = data => {
//     this.setState({ data: data });
//   };

//   handleSuccess = data => {
//     this.setState({ data: data });
//   };

//   handleRowSelect = selectedRows => {
//     this.setState({ selectedRows: selectedRows });
//   };

//   render() {
//     const { data, selectedRows } = this.state;
//     return (
//       <Api url="/purchaseorders" onSuccess={this.handleSuccess}>
//         <Switch>
//           <Route
//             path="/purchase/purchase-orders"
//             exact
//             render={() => (
//               <List
//                 data={data}
//                 selectedRows={selectedRows}
//                 onDataChange={this.handleDataChange}
//                 onRowSelect={this.handleRowSelect}
//               />
//             )}
//           />
//           <Route
//             exact
//             path="/purchase/purchase-orders/create-goods-receipt"
//             render={() => <CreateFromPurchaseOrders purchaseOrders={this.state.selectedRows} />}
//           />
//           <Route exact path="/purchase/purchase-orders/:id" component={ViewPurchaseOrder} />
//         </Switch>
//       </Api>
//     );
//   }
// }

// export default PurchaseOrder;
