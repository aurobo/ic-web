import React from 'react';

class Collection extends React.Component {
  state = {
    collection: [],
    isLoading: true,
    error: null,
  };

  componentDidMount() {
    const { firebase, path, schema, schemaless } = this.props;
    const firestore = firebase.firestore();
    let collection = [];

    firestore
      .collection(path)
      .get()
      .then(docs => {
        docs.forEach(doc => {
          const data = doc.data();
          if (schemaless) {
            collection.push(data);
          } else {
            schema.isValid(data).then(valid => {
              if (!valid) {
                throw new Error('Invalid schema');
              }
              collection.push(data);
            });
          }
        });
        this.setState({ collection, isLoading: false });
      })
      .catch(error => {
        this.setState({ error: error, isLoading: false });
      });
  }
  render() {
    const { collection, isLoading, error } = this.state;

    return <React.Fragment>{this.props.children({ collection, isLoading, error })}</React.Fragment>;
  }
}

export default Collection;
