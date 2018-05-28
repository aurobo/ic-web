import React from 'react';

class Create extends React.Component {
  create = data => {
    let schemaCompliantData = this.schema.cast(data);
    firebase.auth().onAuthStateChanged(user => {
      data.createdBy = user;
      data.lastModifiedBy = user;
      data.createdOn = new Date();
      data.lastModifiedOn = new Date();
    });
    let batch = this.firestore.batch();
    let docRef = this.firestore.collection(this.collection).doc();
    let docHistoryRef = docRef.collection('history').doc();
    let userTimelineRef = this.firestore
      .collection('users')
      .doc(schemaCompliantData.lastModifiedBy.id)
      .collection('timeline')
      .doc();
    batch.set(docRef, schemaCompliantData);
    batch.set(docHistoryRef, schemaCompliantData);
    batch.set(userTimelineRef, { type: 'Created', data: schemaCompliantData });
    batch.commit();
  };

  render() {
    return <React.Fragment>{this.props.children()}</React.Fragment>;
  }
}

export default Create;
