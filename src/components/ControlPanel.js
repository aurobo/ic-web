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
    return <StyledSegment attached>{this.props.children}</StyledSegment>;
  }
}

export default ControlPanel;
