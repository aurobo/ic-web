import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class Tissue extends React.Component {
  render() {
    const listUrl = this.props.match.url + '/list';
    const viewUrl = this.props.match.url + '/:id/view';
    return (
      <Switch>
        <Route path={listUrl} component={this.props.list} render={this.props.renderList} />
        <Route path={viewUrl} component={this.props.view} render={this.props.renderView} />
        <Redirect to={listUrl} />
      </Switch>
    );
  }
}

export default withRouter(Tissue);
