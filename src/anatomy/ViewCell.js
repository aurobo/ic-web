// import React from 'react';
// import { Cell } from '@aurobo/anatomy';
// import { Page, FlatButton, Api } from '@aurobo/components';
// import { withRouter } from 'react-router-dom';
// import { Segment, List, Grid } from 'semantic-ui-react';

// class ViewCell extends React.Component {
//   //Use a render prop to receive data in place of handleSuccess callback and state
//   state = {
//     data: {
//       key: '',
//     },
//   };

//   handleSuccess = data => {
//     this.setState({ data });
//   };

//   render() {
//     const { name, list, getUrlPrefix } = this.props;
//     const { data } = this.state;
//     return (
//       <Api url={getUrlPrefix + this.props.match.params.id} onSuccess={this.handleSuccess}>
//         <Cell
//           name={name + ' / ' + data.key}
//           renderControlPanel={() => (
//             <React.Fragment>
//               <FlatButton size="tiny" primary>
//                 Create
//               </FlatButton>
//             </React.Fragment>
//           )}
//           renderBody={() => (
//             <Page>
//               <h1>{data.key}</h1>
//               <Grid>
//                 <Grid.Row>
//                   <Grid.Column width={10}>
//                     <Segment color="teal">
//                       <List divided relaxed>
//                         {list.map(item => (
//                           <List.Item key={item.accessor}>
//                             <List.Content>
//                               <List.Header>{item.title}</List.Header>
//                               {data[item.accessor]}
//                             </List.Content>
//                           </List.Item>
//                         ))}
//                       </List>
//                     </Segment>
//                   </Grid.Column>
//                   <Grid.Column width={6}>
//                     <Segment color="grey">
//                       <List divided relaxed>
//                         <List.Item>
//                           <List.Content>
//                             <List.Header>Last Modified By</List.Header>
//                             {data.lastModifiedByUserName}
//                           </List.Content>
//                         </List.Item>
//                         <List.Item>
//                           <List.Content>
//                             <List.Header>Last Modified On</List.Header>
//                             {new Date(data.lastModifiedOn).toLocaleDateString()}
//                           </List.Content>
//                         </List.Item>
//                         <List.Item>
//                           <List.Content>
//                             <List.Header>Created By</List.Header>
//                             {data.createdByUserName}
//                           </List.Content>
//                         </List.Item>
//                         <List.Item>
//                           <List.Content>
//                             <List.Header>Created On</List.Header>
//                             {new Date(data.createdOn).toLocaleDateString()}
//                           </List.Content>
//                         </List.Item>
//                       </List>
//                     </Segment>
//                   </Grid.Column>
//                 </Grid.Row>
//               </Grid>
//             </Page>
//           )}
//         />
//       </Api>
//     );
//   }
// }

// export default withRouter(ViewCell);
