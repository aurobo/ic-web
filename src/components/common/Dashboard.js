import React from "react";
import { Link } from "react-router-dom";
import { Grid, Icon, Header, Image } from "semantic-ui-react";
import styled from "styled-components";
import innovicLogo from "../../img/innovic-logo.png";
import TopNav from "./TopNav";

const InnovicLogo = styled(Image)`
  &&& {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.1;
  }
`;

const IconTile = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 50px;
`;

const StyledIcon = styled(Icon)`
  background: orangered;
  border-color: orangered;
  color: white;
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
                  <StyledIcon name="line graph" size="huge" circular link />
                </Link>
                <Header as="h2">Sales</Header>
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
