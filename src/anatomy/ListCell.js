// import React from 'react';
// import { Cell } from '@aurobo/anatomy';
// import { FlatButton, Api, Notification } from '@aurobo/components';
// import ReactTable from 'react-table';
// import 'react-table/react-table.css';
// import { Link } from 'react-router-dom';
// import { api } from '@aurobo/components/Utilities';
// import { Modal, Button } from 'semantic-ui-react';
// import _ from 'lodash';

// class ListCell extends React.Component {
//   state = {
//     data: [],
//     // Move delete to a separate component
//     deleteConfirmationModal: {
//       open: false,
//       data: {
//         key: null,
//       },
//       error: false,
//     },
//   };

//   handleSuccess = data => {
//     this.setState({ data: data });
//   };

//   deleteRow = (e, buttonProps) => {
//     const { deleteConfirmationModal } = this.state;
//     // So much goodness here! https://github.com/react-tools/react-table/issues/367
//     // Do not mutate react state directly, that's why new array. https://github.com/react-tools/react-table/issues/175
//     let data = [...this.state.data];
//     const { deleteUrl } = this.props;
//     api
//       .delete(deleteUrl + '/' + deleteConfirmationModal.data.id)
//       .then(() => {
//         _.remove(data, i => i.id === deleteConfirmationModal.data.id);
//         this.setState({
//           data: data,
//           deleteConfirmationModal: {
//             open: false,
//             data: {
//               key: null,
//             },
//           },
//         });
//       })
//       .catch(
//         error =>
//           error.response.status === 409
//             ? this.setState({ deleteConfirmationModal: { open: false, error: true, data: { key: null } } })
//             : ''
//       );
//   };

//   showDeleteConfirmation = (e, buttonProps, rowData) => {
//     this.setState({
//       deleteConfirmationModal: {
//         open: true,
//         data: rowData,
//       },
//     });
//   };

//   componentDidMount() {
//     const { tableColumns, deleteUrl } = this.props;
//     if (deleteUrl) {
//       tableColumns.push({
//         Header: 'Actions',
//         id: 'actions',
//         Cell: ({ original }) => (
//           <Button
//             size="mini"
//             negative
//             onClick={(e, props) => this.showDeleteConfirmation(e, props, original)}
//             icon="trash"
//           />
//         ),
//       });
//     }
//   }

//   hideDeleteConfirmation = e => {
//     this.setState({
//       deleteConfirmationModal: {
//         open: false,
//         data: { key: null },
//       },
//     });
//   };

//   render() {
//     const { name, tableColumns, getUrl, importLink } = this.props;
//     const { data, deleteConfirmationModal } = this.state;
//     return (
//       <Api url={getUrl} onSuccess={this.handleSuccess}>
//         <Cell
//           name={name}
//           renderControlPanel={() => (
//             <React.Fragment>
//               <FlatButton size="tiny" primary>
//                 Create
//               </FlatButton>
//               <Modal open={deleteConfirmationModal.open} dimmer="blurring" size="tiny">
//                 <Modal.Header>Delete Confirmation</Modal.Header>
//                 <Modal.Content>
//                   <p>Are you sure you want to delete {deleteConfirmationModal.data.key}?</p>
//                 </Modal.Content>
//                 <Modal.Actions>
//                   <Button onClick={e => this.hideDeleteConfirmation(e)}>Cancel</Button>
//                   <Button
//                     onClick={(e, props) => this.deleteRow(e, props)}
//                     negative
//                     labelPosition="right"
//                     icon="trash"
//                     content="Yes"
//                   />
//                 </Modal.Actions>
//               </Modal>
//               {deleteConfirmationModal.error ? (
//                 <Notification header="Can't Delete That">
//                   <p>The entity you're trying to delete is referenced elsewhere.</p>
//                 </Notification>
//               ) : (
//                 ''
//               )}
//               {importLink ? (
//                 <Link to={importLink}>
//                   <FlatButton size="tiny">Import</FlatButton>
//                 </Link>
//               ) : (
//                 ''
//               )}
//             </React.Fragment>
//           )}
//           renderBody={() => (
//             <ReactTable
//               noDataText="No Data"
//               className="-highlight"
//               defaultFilterMethod={(filter, row) =>
//                 String(row[filter.id])
//                   .toLowerCase()
//                   .includes(String(filter.value).toLowerCase())
//               }
//               data={data}
//               columns={tableColumns}
//               defaultPageSize={25}
//               pageSizeOptions={[25, 50, 75, 100]}
//               showPaginationBottom
//               style={{
//                 height: 'calc(100vh - 140px)',
//               }}
//               filterable={true}
//               defaultSorted={[
//                 {
//                   id: 'key',
//                   desc: true,
//                 },
//               ]}
//             />
//           )}
//         />
//       </Api>
//     );
//   }
// }

// export default ListCell;
