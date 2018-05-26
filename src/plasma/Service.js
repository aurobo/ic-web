import firebase from 'firebase';

const matchToSchema = (data, schema) => {
  let result = {};

  for (let property in schema) {
    if (schema.hasOwnProperty(property)) {
      result[property] = data[property];
    }
  }

  return result;
};

const whenCreated = data => {
  firebase.auth().onAuthStateChanged(user => {
    data.createdBy = user.email;
    data.lastModifiedBy = user.email;
    data.createdOn = new Date();
    data.lastModifiedOn = new Date();
  });
};

const whenUpdated = data => {
  firebase.auth().onAuthStateChanged(user => {
    data.lastModifiedBy = user.email;
    data.lastModifiedOn = new Date();
  });
};

class Service {
  constructor(collection, schema) {
    this.collection = collection;
    this.firestore = firebase.firestore();
    this.schema = schema;
  }

  get = () => {
    let docs = [];
    this.firestore
      .collection(this.collection)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          docs.push(doc);
        });
      })
      .catch(function(error) {
        console.log('Error getting documents: ', error);
      });
    return docs;
  };

  getById = id => {
    var docRef = this.firestore.collection(this.collection).doc(id);

    docRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          return doc.data();
        } else {
          console.log('No such document!');
        }
      })
      .catch(function(error) {
        console.log('Error getting document:', error);
      });
  };

  firestoreWillUpdate = transaction => {};

  create = data => {
    let schemaCompliantData = matchToSchema(data, this.schema);
    whenCreated(schemaCompliantData);
    let batch = this.firestore.batch();
    let docRef = this.firestore.collection(this.collection).doc();
    let docHistoryRef = docRef.collection('history').doc();
    batch.set(docRef, schemaCompliantData);
    batch.set(docHistoryRef, schemaCompliantData);
  };

  update = (id, dataToMerge) => {
    whenUpdated(dataToMerge);
    var docRef = this.firestore.collection(this.collection).doc(id);
    this.firestore.runTransaction(transaction => {
      this.firestoreWillUpdate(docRef, dataToMerge, transaction);
      transaction.update(doc, dataToMerge);
    });
  };

  delete = id => {
    this.firestore
      .collection(this.collection)
      .doc(id)
      .delete();
  };
}

export default Service;
