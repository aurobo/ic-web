import React from 'react';

class Document extends React.Component {
  state = {
    doc: {},
    isLoading: true,
    error: null,
  };

  componentDidMount() {
    const { firebase, path, schema, schemaless } = this.props;
    const firestore = firebase.firestore();

    firestore
      .doc(path)
      .get()
      .then(doc => {
        if (doc.exists) {
          let data = null;
          if (schemaless) {
            data = doc.data();
          } else {
            schema.isValid(data).then(valid => {
              if (!valid) {
                throw new Error('Invalid schema');
              }
              data = doc.data();
            });
          }
          this.setState({ doc: data, isLoading: false });
        } else {
          throw new Error('No such document!');
        }
      })
      .catch(error => {
        this.setState({ error: error, isLoading: false });
      });
  }

  render() {
    const { doc, isLoading, error } = this.state;
    return <React.Fragment>{this.props.children({ doc, isLoading, error })}</React.Fragment>;
  }
}

export default Document;
