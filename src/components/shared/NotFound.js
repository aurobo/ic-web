import React from 'react';
import { Message, Icon } from 'semantic-ui-react';

class NotFound extends React.Component {
  render() {
    return (
      <Message icon>
        <Icon name="meh" />
        <Message.Header>Not Found</Message.Header>
      </Message>
    );
  }
}

export default NotFound;
