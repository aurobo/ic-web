import React from 'react';

class Collection extends React.Component {
  state = {
    collection: [],
    isLoading: true,
    error: null,
  };

  componentDidMount() {
    const { firestore, path, schema, schemaless } = this.props;

    firestore
      .collection(path)
      .orderBy('meta.createdOn', 'desc')
      .onSnapshot(
        docs => {
          let collection = [];
          docs.forEach(doc => {
            const data = doc.data();
            if (!schemaless) {
              schema.isValid(data).then(valid => {
                if (!valid) {
                  throw new Error('Invalid schema');
                }
              });
            }
            data.id = doc.id;
            collection.push(data);
          });
          this.setState({ collection, isLoading: false });
        },
        error => {
          this.setState({ error: error, isLoading: false });
        }
      );
  }
  render() {
    const { collection, isLoading, error } = this.state;

    return <React.Fragment>{this.props.children({ collection, isLoading, error })}</React.Fragment>;
  }
}

export default Collection;
