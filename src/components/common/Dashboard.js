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

const IconLink = styled(Link)`
  &&& {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px;
  }
`;

const IconLabel = styled.span`
  margin-top: 5px;
  font-size: 14px;
  line-height: 14px;
  color: #333;
`;

const Icons = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  padding-top: 80px;
  margin-left: 80px;
`;

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <TopNav menuHeader="Dashboard" url={this.props.url} className="no-print" onLogout={this.props.onLogout} />
        {/* <Icons>
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
        </Icons> */}
        <Icons>
          <IconLink to="/sales">
            <Icon bordered inverted color="teal" size="big" name="truck" flipped="horizontally" />
            <IconLabel>Sales</IconLabel>
          </IconLink>
          <IconLink to="/purchase">
            <Icon bordered inverted color="teal" size="big" name="truck" />
            <IconLabel>Purchase</IconLabel>
          </IconLink>
        </Icons>
        <InnovicLogo src={innovicLogo} size="huge" />
      </div>
    );
  }
}

export default Dashboard;
