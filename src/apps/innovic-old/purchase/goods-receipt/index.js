// import React from 'react';
// import Api from '@aurobo/components/Api';
// import { Route, Switch } from 'react-router-dom';
// import List from './List';
// import ViewGoodsReceipt from './View';

// class GoodsReceipt extends React.Component {
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
//       <Api url="/GoodsReceipts" onSuccess={this.handleSuccess}>
//         <Switch>
//           <Route
//             path="/purchase/goods-receipts"
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
//           <Route exact path="/purchase/goods-receipts/:id" component={ViewGoodsReceipt} />
//         </Switch>
//       </Api>
//     );
//   }
// }

// export default GoodsReceipt;
