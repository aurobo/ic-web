// import React from 'react';
// import Api from '@aurobo/components/Api';
// import { Route, Switch } from 'react-router-dom';
// import CreatePurchaseOrder from '../purchase-order/Create';
// import List from './List';
// import ViewPurchaseRequest from './View';

// class PurchaseRequest extends React.Component {
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
//       <Api url="/purchaserequests" onSuccess={this.handleSuccess}>
//         <Switch>
//           <Route
//             path="/purchase/purchase-requests"
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
//             path="/purchase/purchase-requests/create-purchase-order"
//             render={() => <CreatePurchaseOrder purchaseRequests={this.state.selectedRows} />}
//           />
//           <Route exact path="/purchase/purchase-requests/:id" component={ViewPurchaseRequest} />
//         </Switch>
//       </Api>
//     );
//   }
// }

// export default PurchaseRequest;
