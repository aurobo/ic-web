// import React from 'react';

// export default class Update extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { existingData: this.props.data || undefined };
//   }

//   componentDidMount = () => {
//     this.state.existingData || this.getById();
//   };

//   update = values => {
//     const { path, id } = this.props;
//     console.log('update called');
//     // update to `${this.props.path}/${this.props.id}
//   };
//   getById = () => {
//     const { id, firestore, path } = this.props;

//     var docRef = firestore.collection(path).doc(id);
//     return docRef.get().then(
//       doc => {
//         if (doc.exists) {
//           console.log(doc.data());
//           this.setState({ existingData: { ...doc.data() } });
//         } else {
//           throw `${path}/${id} document does not exist`;
//         }
//       },
//       error => {
//         console.error(error);
//       }
//     );

//     //from this.props.id
//   };
//   render() {
//     return (
//       <React.Fragment>
//         {this.props.children({ update: this.update, data: this.state.existingData || {} })}
//       </React.Fragment>
//     );
//   }
// }
