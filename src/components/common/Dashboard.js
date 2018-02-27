import React from "react";
import { Link } from "react-router-dom";
import { Segment, Grid, Icon, Header, Image } from "semantic-ui-react";
import styled from "styled-components";
import innovicLogo from "../../img/innovic-logo.png";
import TopNav from "./TopNav";

const InnovicLogo = styled(Image)`
  &&& {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.05;
  }
`;

const IconTile = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 50px;
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
        <TopNav
          menuHeader="Dashboard"
          url={this.props.url}
          className="no-print"
          onLogout={this.props.onLogout}
        />
        <Grid>
          <Grid.Row>
            <Grid.Column width="4">
              <IconTile>
                <Link to="/sales">
                  <Segment stacked>
                    <StyledIcon name="line graph" size="big" circular />
                    <StyledHeader as="h2">Sales</StyledHeader>
                  </Segment>
                </Link>
              </IconTile>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <InnovicLogo src={innovicLogo} size="huge" />
      </div>
    );
  }
}

export default Dashboard;
