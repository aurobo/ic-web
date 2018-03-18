import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Icon, Header, Image } from 'semantic-ui-react';
import styled from 'styled-components';
import innovicLogo from '../../img/innovic-logo.png';
import TopNav from './TopNav';

const InnovicLogo = styled(Image)`
  &&& {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.05;
  }
`;

const Icons = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  padding-top: 80px;
  margin-left: 80px;
`;

const StyledLink = styled(Link)`
  &&& {
    margin: 20px;
  }
`;

const StyledIcon = styled(Icon)`
  &&& {
    box-shadow: 0 0 0 0.11em ${props => props.theme.accent} inset;
    margin: 5px;
    color: ${props => props.theme.accent};
  }
`;

const StyledHeader = styled(Header)`
  &&& {
    text-transform: uppercase;
    color: ${props => props.theme.accent};
    margin-top: 5px;
    font-size: 16px;
    text-align: center;
  }
`;

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <TopNav menuHeader="Dashboard" url={this.props.url} className="no-print" onLogout={this.props.onLogout} />
        <Icons>
          <StyledLink to="/sales">
            <Segment textAlign="center">
              <StyledIcon name="line graph" size="big" circular />
              <StyledHeader as="h2">Sales</StyledHeader>
            </Segment>
          </StyledLink>
          <StyledLink to="/purchase">
            <Segment textAlign="center">
              <StyledIcon name="truck" size="big" circular />
              <StyledHeader as="h2">Purchase</StyledHeader>
            </Segment>
          </StyledLink>
        </Icons>
        <InnovicLogo src={innovicLogo} size="huge" />
      </div>
    );
  }
}

export default Dashboard;
