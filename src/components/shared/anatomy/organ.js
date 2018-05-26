import React from 'react';
import { TopNav } from '@innovic/components/shared';
import { withRouter } from 'react-router-dom';

class Organ extends React.Component {
  render() {
    const { name, renderSwitch, renderMenu } = this.props;
    return (
      <div>
        <TopNav menuHeader={name} url={this.props.match.url} className="no-print" onLogout={this.props.onLogout}>
          {renderMenu()}
        </TopNav>
        {renderSwitch()}
      </div>
    );
  }
}

export default withRouter(Organ);
