import styled from 'styled-components';
import { Dropdown } from 'semantic-ui-react';
import React from 'react';
import { Link } from 'react-router-dom';

const StyledDropdownLink = styled(Dropdown.Item)`
  &&& {
    color: ${props => (props.darkmode ? '#fff' : 'rgba(0, 0, 0, 0.87) !important')};
  }
  &:hover {
    background: rgba(34, 36, 38, 0.1) !important;
  }
`;

const DropdownLink = props => (
  <Link to={props.to}>
    <StyledDropdownLink as="span" darkmode={props.darkmode}>
      {props.children}
    </StyledDropdownLink>
  </Link>
);

export default DropdownLink;
