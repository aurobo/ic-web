import React from 'react';

class Set extends React.Component {
  collectionPath = '';
  docId = '';
  batch = {};
  docRef = {};

  /* TO_CONFIRM */
  constructor(props) {
    super(props);
    const { path, firestore, parentBatch, parentdocRef, shouldCommit } = this.props;

    /* TO_CONFIRM */

    if (parentBatch && shouldCommit) {
      throw `The child entity should delegate
       it's data save to parent (by sending parentBatch) OR should take responsibility 
       itself (by passing shouldCommit), but can't both at the same time`;
    }

    /* TO_CONFIRM - so dont ned to set id in the doc */
    let splittedPath = path.split('/');

    //If docId exist in the path means the operation is Update else it is Create
    this.docId = splittedPath.length % 2 === 0 ? splittedPath.splice(splittedPath.length - 1, 1)[0] : undefined;
    this.collectionPath = splittedPath.join('/');

    if (parentBatch) {
      this.batch = parentBatch;
      this.docRef = this.docId
        ? parentdocRef.collection(this.collectionPath).doc(this.docId)
        : parentdocRef.collection(this.collectionPath).doc();
    } else {
      this.batch = firestore.batch();
      this.docRef = this.docId
        ? firestore.collection(this.collectionPath).doc(this.docId)
        : firestore.collection(this.collectionPath).doc();
    }
  }

  set = formData => {
    const { firebase, firestore, schema, schemaless, onSubmit, alias, shouldCommit } = this.props;
    let data = { ...formData };

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if (!this.docId) {
          data.meta = {
            createdBy: { uid: user.uid, email: user.email },
            createdOn: new Date(),
          };
        }
        data.meta = {
          ...data.meta,
          ...{
            lastModifiedBy: { uid: user.uid, email: 'sanket@aurobo.in' },
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

        let docHistoryRef = this.docRef.collection('history').doc();
        let userTimelineRef = firestore
          .collection('users')
          .doc(user.uid)
          .collection('timeline')
          .doc();

        // key generation will be shifted to cloud function
        // firestore

        this.batch.set(this.docRef, data, { merge: true });
        this.batch.set(docHistoryRef, data);
        this.batch.set(userTimelineRef, { type: 'Created', data: data });

        if (shouldCommit) {
          this.batch.commit();
        }

        if (typeof onSubmit === 'function') {
          onSubmit();
        }
      }
    });
  };

  render() {
    return (
      <React.Fragment>{this.props.children({ set: this.set, batch: this.batch, docRef: this.docRef })}</React.Fragment>
    );
  }
}

export default Set;
