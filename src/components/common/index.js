import React from 'react';
import styled from 'styled-components';
import { Message, Button } from 'semantic-ui-react';
import Dropdown from 'semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown';
import { Link } from 'react-router-dom';
import Table from 'semantic-ui-react/dist/commonjs/collections/Table/Table';

const theme = {
  primary: '#3b79c6',
  accent: 'rgb(244, 67, 54);',
};

const FlatButton = styled(Button)`
  &&& {
    border-radius: 0;
    text-transform: uppercase;
    padding: 5px;
  }
`;
const Page = styled(Message)`
  &&& {
    margin: 15px auto;
    border-radius: 0;
    background: #fff;
  }
  @media screen {
    width: 80%;
  }
`;
const MapButton = styled(Button)`
  &&& {
    border-radius: 0;
    text-transform: uppercase;
    padding: 5px;
    margin: 10px;
  }
`;

const StyledDropdownLink = styled(Dropdown.Item)`
  &&& {
    color: rgba(0, 0, 0, 0.87) !important;
  }
  &:hover {
    background: rgba(34, 36, 38, 0.1) !important;
  }
`;

const DropdownLink = props => (
  <Link to={props.to}>
    <StyledDropdownLink as="span">{props.children}</StyledDropdownLink>
  </Link>
);

const StyledTable = styled(Table)`
  &&& {
    margin-top: 0;
    border-radius: 0;
  }
`;

export { theme, FlatButton, DropdownLink, StyledTable, Page, MapButton };
