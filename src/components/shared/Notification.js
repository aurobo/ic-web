import React from 'react';
import styled from 'styled-components';
import { Message } from 'semantic-ui-react';

const StyledMessage = styled(Message)`
  &&& {
    position: fixed;
    z-index: 9999;
    min-width: 400px;
    right: 10px;
    top: 40px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  }
`;

class Notification extends React.Component {
  render() {
    const { header } = this.props;
    return (
      <StyledMessage negative floating onDismiss={this.handleDismiss}>
        <Message.Header>{header}</Message.Header>
        {this.props.children}
      </StyledMessage>
    );
  }
}

export default Notification;
