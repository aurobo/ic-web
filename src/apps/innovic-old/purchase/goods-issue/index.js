// import React from 'react';
// import Api from '@aurobo/components/Api';
// import { Route, Switch } from 'react-router-dom';
// import List from './List';
// import ViewGoodsIssue from './View';
// import CreateFromGoodsIssues from '../goods-receipt/CreateFromGoodsIssues';

// class GoodsIssue extends React.Component {
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
//       <Api url="/GoodsIssues" onSuccess={this.handleSuccess}>
//         <Switch>
//           <Route
//             path="/purchase/goods-issues"
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
//             path="/purchase/goods-issues/create-goods-receipt"
//             render={() => <CreateFromGoodsIssues goodsIssues={this.state.selectedRows} />}
//           />
//           <Route exact path="/purchase/goods-issues/:id" component={ViewGoodsIssue} />
//         </Switch>
//       </Api>
//     );
//   }
// }

// export default GoodsIssue;
