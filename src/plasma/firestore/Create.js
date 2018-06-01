import React from 'react';

class Create extends React.Component {
  create = data => {
    const { firebase, firestore, path, schema, schemaless, onSubmit, alias } = this.props;

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        data.meta = {
          createdBy: { uid: user.uid, email: user.email },
          lastModifiedBy: { uid: user.uid, email: user.email },
          createdOn: new Date(),
          lastModifiedOn: new Date(),
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
        let docRef = firestore.collection(path).doc();
        let docHistoryRef = docRef.collection('history').doc();
        let userTimelineRef = firestore
          .collection('users')
          .doc(user.uid)
          .collection('timeline')
          .doc();

        firestore
          .collection(path)
          // Needs to be configurable
          .orderBy('meta.createdOn', 'desc')
          .limit(1)
          .get()
          .then(collection => {
            if (collection.docs[0] && collection.docs[0].data().keyId) {
              data.keyId = collection.docs[0].data().keyId + 1;
            } else {
              data.keyId = 1;
            }

            let str = '' + data.keyId;
            let pad = '00000';

            data.key = alias + '-' + pad.substring(0, pad.length - str.length) + str;

            batch.set(docRef, data);
            batch.set(docHistoryRef, data);
            batch.set(userTimelineRef, { type: 'Created', data: data });
            batch.commit();
            if (typeof onSubmit === 'function') {
              onSubmit();
            }
          });
      }
    });
  };

  render() {
    return <React.Fragment>{this.props.children({ create: this.create })}</React.Fragment>;
  }
}

export default Create;
