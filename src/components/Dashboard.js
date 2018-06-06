import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Image } from 'semantic-ui-react';
import styled from 'styled-components';
import TopNav from './TopNav';
import IfHasPermission from './IfHasPermission';

const Logo = styled(Image)`
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
  transition: font-weight 300ms linear;
  color: ${props => props.theme.primary.default};
`;

const Icons = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  padding-top: 80px;
  margin-left: 80px;
`;

const StyledIcon = styled(Icon).attrs({
  bordered: true,
  size: 'big',
})`
  &&&&&& {
    box-shadow: 0 0 0 0.1em ${props => props.theme.primary.light} inset;
    color: ${props => props.theme.primary.light} !important;
  }
  ${IconLink}:hover &&&&&& {
    box-shadow: 0 0 0 0.1em ${props => props.theme.primary.default} inset;
    color: ${props => props.theme.primary.default} !important;
  }
`;

class Dashboard extends React.Component {
  render() {
    const { logo } = this.props;
    return (
      <div>
        <TopNav menuHeader="Dashboard" url={this.props.url} className="no-print" onLogout={this.props.onLogout} />
        <Icons>
          {/* <IconLink to="/master">
            <StyledIcon name="database" />
            <IconLabel>Master</IconLabel>
          </IconLink> */}
          <IfHasPermission permissions={['accessSales']}>
            <IconLink to="/sales">
              <StyledIcon name="truck" flipped="horizontally" />
              <IconLabel>Sales</IconLabel>
            </IconLink>
          </IfHasPermission>
          {/* <IfHasPermission permissions={['accessPurchase']}>
            <IconLink to="/purchase">
              <StyledIcon name="truck" />
              <IconLabel>Purchase</IconLabel>
            </IconLink>
          </IfHasPermission> */}
        </Icons>
        <Logo src={logo} size="huge" />
      </div>
    );
  }
}

export default Dashboard;