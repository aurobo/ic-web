import React from 'react';

class Set extends React.Component {
  batch = {};
  state = { isLoading: false, error: undefined };
  constructor(props) {
    super(props);
    const { firestore, parentBatch } = this.props;

    if (parentBatch) {
      //child entity wants to delegate the save operation to parent, so will use parent batch
      this.batch = parentBatch;
    } else {
      //will be usefult for parent, it will create own batch and collectionPath, parentDocRef should not be passed for parent
      //otherwise the first if condision will get passed
      this.batch = firestore.batch();
    }
  }

  set = formData => {
    const { firestore, schema, schemaless, onSubmit, parentBatch, collectionPath, user } = this.props;
    let data = { ...formData };
    if (user) {
      if (!data.id) {
        data.meta = {
          createdBy: { uid: user.uid, email: user.email },
          createdOn: new Date(),
        };
      }
      data.meta = {
        ...data.meta,
        ...{
          lastModifiedBy: { uid: user.uid, email: user.email },
          lastModifiedOn: new Date(),
        },
      };

      // Validate schema before updating
      if (!schemaless) {
        schema.isValid(data).then(valid => {
          if (!valid) {
            throw new Error('Invalid schema');
          }
        });
      }

      let docRef = data.id
        ? firestore.collection(collectionPath).doc(data.id)
        : firestore.collection(collectionPath).doc();
      if (!data.id) {
        data.id = docRef.id;
      }
      let docHistoryRef = docRef.collection('history').doc();
      let userTimelineRef = firestore
        .collection('users')
        .doc(user.uid)
        .collection('timeline')
        .doc();

      // key generation will be shifted to cloud function

      this.batch.set(docRef, data, { merge: true });
      this.batch.set(docHistoryRef, data);
      this.batch.set(userTimelineRef, { type: 'Created', data: data });

      if (!parentBatch) {
        this.setState({ isLoading: true });

        this.batch.commit().then(
          () => {
            this.setState({ isLoading: false });
          },
          errorResponse => {
            this.setState({ isLoading: false, error: errorResponse });
          }
        );
      }

      if (typeof onSubmit === 'function') {
        onSubmit(data);
      }
    } else {
      throw new Error('User Not Found');
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.props.children({
          set: this.set,
          batch: this.batch,
          isLoading: this.state.isLoading,
          error: this.state.error,
        })}
      </React.Fragment>
    );
  }
}

export default Set;
