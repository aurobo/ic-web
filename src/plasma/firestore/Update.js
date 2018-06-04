import React from 'react';

export default class Update extends React.Component {
  constructor(props) {
    super(props);
    this.state = { existingData: this.props.data || undefined };
  }

  componentDidMount = () => {
    this.state.existingData || this.getById();
  };

  update = ({ data, cusName }) => {
    const { firebase, firestore, id, path, schema, schemaless } = this.props;

    console.log('---data1---');

    console.log(data);
    firebase.auth().onAuthStateChanged(user => {
      let userUpdateMeta = {
        lastModifiedBy: { uid: user.uid, email: user.email },
        lastModifiedOn: new Date(),
      };
      data.meta = Object.assign(data.meta, userUpdateMeta);
      console.log('---data2---');

      console.log(data);
      data = Object.assign(data, { customer: cusName });
      let items = [
        {
          material: 'pen',
          quantity: 10,
        },
        {
          material: 'cover',
          quantity: 2,
        },
        {
          material: 'point',
          quantity: 5,
        },
      ];
      data.salesItems = [];
      // items.forEach(element => {
      //   firestore
      //     .collection('salesOrderItems')
      //     .add(element)
      //     .then(
      //       docRef => {
      //         console.log(`created item doc ${docRef.id}`);
      //         let item = Object.assign({}, element, { id: docRef.id });
      //         data.salesItems.push(item);
      //       },
      //       error => {
      //         console.log(`error occured ${error}`);
      //       }
      //     );
      // });

      console.log('---data3---');

      console.log(data);

      // Validate schema before updating
      if (!schemaless) {
        schema.isValid(data).then(valid => {
          if (!valid) {
            throw new Error('Invalid schema');
          }
        });
      }
      let batch = firestore.batch();
      var docRef = firestore.collection(path).doc(id);
      batch.update(docRef, data);
      items.forEach(element => {
        let SalesItemRef = docRef.collection('salesOrderItems').doc(element.material);
        batch.set(SalesItemRef, element);
      });
      batch.commit().then(
        successRep => {
          console.log(`Batch success ${successRep}`);
        },
        error => {
          throw `batch failed  ::: ${JSON.stringify(error)}`;
        }
      );

      //   docRef.update(data).then(
      //     successRep => {
      //       console.log(`Data updated successfully for doc ${id}`);
      //     },
      //     error => {
      //       throw `Error ocurred while updating details of ${id}  ::: ${JSON.stringify(error)}`;
      //     }
      //   );
    });
  };
  getById = () => {
    const { id, firestore, path } = this.props;

    var docRef = firestore.collection(path).doc(id);
    return docRef.get().then(
      doc => {
        if (doc.exists) {
          this.setState({ existingData: { ...doc.data() } });
        } else {
          throw `${path}/${id} document does not exist`;
        }
      },
      error => {
        console.error(error);
      }
    );

    //from this.props.id
  };
  render() {
    return (
      <React.Fragment>
        {this.props.children({ update: this.update, data: this.state.existingData || {} })}
      </React.Fragment>
    );
  }
}
