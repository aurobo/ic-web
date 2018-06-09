import React from 'react';

class Delete extends React.Component {
  state = { isLoading: false, error: undefined };
  delete = props => {
    const { docPath, firestore } = this.props;

    this.setState({ isLoading: true });
    console.log(docPath);

    firestore
      .doc(docPath)
      .delete()
      .then(successRes => {
        this.setState({ isLoading: false });
      })
      .catch(error => {
        this.setState({ isLoading: false, error: error });
      });
  };
  render() {
    return (
      <React.Fragment>
        {this.props.children({ deleteDoc: this.delete, isLoading: this.state.isLoading, error: this.state.error })}
      </React.Fragment>
    );
  }
}

export default Delete;
