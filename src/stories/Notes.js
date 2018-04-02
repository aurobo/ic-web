import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  margin-left: 15px;
`;

export default class Notes extends React.Component {
  render() {
    return <StyledDiv dangerouslySetInnerHTML={{ __html: this.props.html }} />;
  }
}
