import React from 'react';
import { Message, Dimmer, Loader } from 'semantic-ui-react';
import { api } from './Utilities';

class Api extends React.Component {
  state = { hasError: false, requestCompleted: false, loading: true };

  handleDismiss = () => {
    this.setState({ hasError: false });
  };

  componentDidMount() {
    let config = {
      onDownloadProgress: progressEvent => this.setState({ loading: false }),
    };

    api.get(this.props.url, config).then(response => {
      this.setState({ requestCompleted: true });
      this.props.onSuccess(response.data);
    });
  }

  isLoading = () => this.props.isLoading(this.state.loading);

  render() {
    const { hasError, requestCompleted } = this.state;
    if (requestCompleted) {
      return hasError ? (
        <Message negative floating onDismiss={this.handleDismiss}>
          <Message.Header>We're sorry we can't apply that discount</Message.Header>
          <p>That offer has expired</p>
        </Message>
      ) : (
        <div>{this.props.children}</div>
      );
    } else {
      return (
        <Dimmer active inverted>
          <Loader size="large" />
        </Dimmer>
      );
    }
  }
}

export default Api;
