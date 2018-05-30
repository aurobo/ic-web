import React from 'react';
import styled from 'styled-components';
import Loader from 'semantic-ui-react/dist/commonjs/elements/Loader/Loader';
import { Segment } from 'semantic-ui-react';

const StyledSegment = styled(Segment)`
  &&& {
    background: white;
    margin-top: 40px;
  }
`;

const StyledLoader = styled(Loader)`
  &&& {
    margin-left: 10px;
    margin-bottom: 5px;
  }
  &&&:after {
    border-color: ${props => props.theme.primary} transparent transparent;
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
