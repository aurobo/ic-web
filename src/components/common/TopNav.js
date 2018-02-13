import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import Link from "react-router-dom/Link";
import styled from "styled-components";

const StyledMenu = styled(Menu)`
  &&& {
    background-color: ${props => props.theme.primary};
  }
`;

class TopNav extends React.Component {
  render() {
    return (
      <StyledMenu fixed="top" inverted className={this.props.className}>
        <Link to="/dashboard">
          <Menu.Item header>
            <Icon name="grid layout" />
          </Menu.Item>
        </Link>
        <Link to={this.props.url}>
          <Menu.Item header>{this.props.menuHeader || "Innovic"}</Menu.Item>
        </Link>
        {this.props.children}
      </StyledMenu>
    );
  }
}

export default TopNav;
