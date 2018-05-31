import React from 'react';
import styled from 'styled-components';

import { Segment } from 'semantic-ui-react';

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
