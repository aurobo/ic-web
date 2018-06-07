import React from 'react';
import { Menu, Icon, Input } from 'semantic-ui-react';
import Link from 'react-router-dom/Link';
import styled from 'styled-components';
import firebase from 'firebase/app';

const StyledMenu = styled(Menu)`
  &&& {
    background-color: ${props => props.theme.primary.default};
  }
`;

const WideMenuItem = styled(Menu.Item)`
  &&& {
    width: 500px;
  }
`;

class TopNav extends React.Component {
  logout = () => {
    console.log('hi');
    firebase.auth().signOut();
  };
  render() {
    const { url } = this.props;
    return (
      <StyledMenu fixed="top" inverted className={this.props.className}>
        <Link to="/dashboard">
          <Menu.Item header>
            <Icon name="grid layout" />
          </Menu.Item>
        </Link>
        <Link to={url}>
          <Menu.Item header>{this.props.menuHeader || 'Aurobo'}</Menu.Item>
        </Link>
        {this.props.children}
        <Menu.Menu position="right">
          <WideMenuItem>
            <Input disabled icon="search" size="mini" placeholder="Search..." />
          </WideMenuItem>
          <Menu.Item name="logout" onClick={this.logout} />
        </Menu.Menu>
      </StyledMenu>
    );
  }
}

export default TopNav;
