import React from 'react';
import { Segment } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledSegment = styled(Segment)`
  &&& {
    background: white;
    margin-top: 40px;
  }
`;

class ControlPanel extends React.Component {
  render() {
    return (
      <StyledSegment attached>
        <h2>{this.props.title}</h2>
        {this.props.children}
      </StyledSegment>
    );
  }
}

export default ControlPanel;
