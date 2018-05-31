import React from 'react';

class Create extends React.Component {
  create = data => {
    const { firebase, firestore, path, schema, schemaless } = this.props;

    firebase.auth().onAuthStateChanged(function(user) {
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
        batch.set(docRef, data);
        batch.set(docHistoryRef, data);
        batch.set(userTimelineRef, { type: 'Created', data: data });
        batch.commit();
      }
    });
  };

  render() {
    return <React.Fragment>{this.props.children({ create: this.create })}</React.Fragment>;
  }
}

export default Create;
