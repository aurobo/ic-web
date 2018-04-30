import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Image } from 'semantic-ui-react';
import styled from 'styled-components';
import innovicLogo from '@innovic/assets/img/innovic-logo.png';
import TopNav from './TopNav';

const InnovicLogo = styled(Image)`
  &&& {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.05;
    z-index: -99;
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
  transition: font-weight 300ms linear;

  ${IconLink}:hover & {
    color: teal;
    transition: color 300ms linear;
  }
`;

const Icons = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  padding-top: 80px;
  margin-left: 80px;
`;

const StyledIcon = styled(Icon).attrs({ inverted: true, bordered: true, color: 'teal', size: 'big' })`
  ${IconLink}:hover &&& {
    box-shadow: inset 0 0 10px teal;
  }
`;

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <TopNav menuHeader="Dashboard" url={this.props.url} className="no-print" onLogout={this.props.onLogout} />
        <Icons>
          <IconLink to="/master">
            <StyledIcon name="database" />
            <IconLabel>Master</IconLabel>
          </IconLink>
          <IconLink to="/sales">
            <StyledIcon name="truck" flipped="horizontally" />
            <IconLabel>Sales</IconLabel>
          </IconLink>
          <IconLink to="/purchase">
            <StyledIcon name="truck" />
            <IconLabel>Purchase</IconLabel>
          </IconLink>
        </Icons>
        <InnovicLogo src={innovicLogo} size="huge" />
      </div>
    );
  }
}

export default Dashboard;
