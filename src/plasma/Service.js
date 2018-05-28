const matchToSchema = (data, schema) => {
  let result = {};

  for (let property in schema) {
    if (schema.hasOwnProperty(property)) {
      result[property] = data[property];
    }
  }

  return result;
};

const whenCreated = (firebase, data) => {
  firebase.auth().onAuthStateChanged(user => {
    data.createdBy = user.email;
    data.lastModifiedBy = user.email;
    data.createdOn = new Date();
    data.lastModifiedOn = new Date();
  });
};

const whenUpdated = (firebase, data) => {
  firebase.auth().onAuthStateChanged(user => {
    data.lastModifiedBy = user.email;
    data.lastModifiedOn = new Date();
  });
};

class Service {
  constructor(firebase, collection, schema) {
    this.firebase = firebase;
    this.firestore = firebase.firestore();
    this.collection = collection;
    this.schema = schema;
  }

  get = () => {
    let list = [];
    this.firestore
      .collection(this.collection)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const data = doc.data();
          this.schema.isValid(data).then(valid => {
            if (!valid) {
              throw new Error('Invalid schema');
            }
            list.push(data);
          });
        });
      })
      .catch(error => {
        console.log('Error getting documents: ', error);
      });
    return list;
  };

  getById = id => {
    var docRef = this.firestore.collection(this.collection).doc(id);

    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          const data = doc.data();
          this.schema.isValid(data).then(valid => {
            if (!valid) {
              throw new Error('Invalid schema');
            }
            return data;
          });
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
    //let schemaCompliantData = matchToSchema(data, this.schema);
    let schemaCompliantData = this.schema.cast(data);
    whenCreated(this.firebase, schemaCompliantData);
    let batch = this.firestore.batch();
    let docRef = this.firestore.collection(this.collection).doc();
    let docHistoryRef = docRef.collection('history').doc();
    batch.set(docRef, schemaCompliantData);
    batch.set(docHistoryRef, schemaCompliantData);
  };

  update = (id, data) => {
    let schemaCompliantData = this.schema.cast(data);
    whenUpdated(this.firebase, schemaCompliantData);
    var docRef = this.firestore.collection(this.collection).doc(id);
    this.firestore.runTransaction(transaction => {
      this.firestoreWillUpdate(docRef, data, transaction);
      transaction.update(docRef, schemaCompliantData);
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
