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

    firebase.auth().onAuthStateChanged(user => {
      let userUpdateMeta = {
        lastModifiedBy: { uid: user.uid, email: user.email },
        lastModifiedOn: new Date(),
      };
      data.meta = Object.assign(data.meta, userUpdateMeta);

      data = Object.assign(data, { customer: cusName });

      // Validate schema before updating
      if (!schemaless) {
        schema.isValid(data).then(valid => {
          if (!valid) {
            throw new Error('Invalid schema');
          }
        });
      }

      var docRef = firestore.collection(path).doc(id);
      docRef.update({ data }).then(
        successRep => {
          console.log(`Data updated successfully for doc ${id}`);
        },
        error => {
          throw `Error ocurred while updating details of ${id}  ::: ${JSON.stringify(error)}`;
        }
      );
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
