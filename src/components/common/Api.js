import React from 'react';
import { Message, Dimmer, Loader } from 'semantic-ui-react';
import { api } from './Utilities';
import styled from 'styled-components';

const StyledMessage = styled(Message)`
  &&& {
    position: fixed;
    z-index: 9999;
    min-width: 400px;
    right: 10px;
    bottom: 10px;
  }
`;
class Api extends React.Component {
  state = { hasError: false, requestCompleted: false, loading: true };

  handleDismiss = () => {
    this.setState({ hasError: false });
  };

  componentDidMount() {
    let config = {
      onDownloadProgress: progressEvent => this.setState({ loading: false }),
    };

    api
      .get(this.props.url, config)
      .then(response => {
        this.setState({ requestCompleted: true });
        this.props.onSuccess(response.data);
      })
      .catch(error => {
        this.setState({ requestCompleted: true, hasError: true });
      });
  }

  isLoading = () => this.props.isLoading(this.state.loading);

  render() {
    const { hasError, requestCompleted } = this.state;
    if (requestCompleted) {
      return hasError ? (
        <div>
          <StyledMessage negative floating onDismiss={this.handleDismiss}>
            <Message.Header>Something Went Wrong</Message.Header>
            <p>Contact Administrator</p>
          </StyledMessage>
          {this.props.children}
        </div>
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
