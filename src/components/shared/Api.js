import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import { api } from './Utilities';
import { Notification } from '@innovic/components/shared';

// https://github.com/axios/axios/issues/960
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
        <React.Fragment>
          <Notification header="Something Went Wrong">
            <p>Contact Administrator</p>
          </Notification>
          {this.props.children}
        </React.Fragment>
      ) : (
        <React.Fragment>{this.props.children}</React.Fragment>
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
