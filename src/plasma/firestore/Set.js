import React from 'react';

class Set extends React.Component {
  set = formData => {
    const { firebase, firestore, path, schema, schemaless, onSubmit, alias } = this.props;
    let data = { ...formData };
    let splittedPath = path.split('/');

    //If existingDocId exist in the path means the operation is Update else it is Create
    let existingDocId = splittedPath.length % 2 === 0 ? splittedPath.splice(splittedPath.length - 1, 1)[0] : undefined;
    let preccedingPath = splittedPath.join('/');

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if (!existingDocId) {
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
        let batch = firestore.batch();
        let docRef = existingDocId
          ? firestore.collection(preccedingPath).doc(existingDocId)
          : firestore.collection(preccedingPath).doc();
        let docHistoryRef = docRef.collection('history').doc();
        let userTimelineRef = firestore
          .collection('users')
          .doc(user.uid)
          .collection('timeline')
          .doc();

        // key generation will be shifted to cloud function
        // firestore

        batch.set(docRef, data, { merge: true });
        batch.set(docHistoryRef, data);
        batch.set(userTimelineRef, { type: 'Created', data: data });
        batch.commit();
        if (typeof onSubmit === 'function') {
          onSubmit();
        }
      }
    });
  };

  render() {
    return <React.Fragment>{this.props.children({ set: this.set })}</React.Fragment>;
  }
}

export default Set;
