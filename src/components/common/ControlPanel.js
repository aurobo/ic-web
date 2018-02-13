import React from "react";
import styled from "styled-components";
import Loader from "semantic-ui-react/dist/commonjs/elements/Loader/Loader";

const Wrapper = styled.div`
  height: 100px;
  background: white;
  margin-top: 40px;
  padding: 10px 15px;
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
      <Wrapper className={this.props.className}>
        <h2>
          {this.props.title}
          <StyledLoader active={this.props.loading} inline size="small" />
        </h2>
        {this.props.children}
      </Wrapper>
    );
  }
}

export default ControlPanel;
