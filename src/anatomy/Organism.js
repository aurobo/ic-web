import React from 'react';
import { Switch, Redirect, withRouter, Route } from 'react-router-dom';
import { Organ } from '@aurobo/anatomy';
import { Dashboard } from '@aurobo/components';
import { kebabize } from '../utils';

const Organism = ({ children, name, render, ...rest }) => {
  let firstChildPath = null;
  let parentPath = '/' + kebabize(name);
  return (
    <React.Fragment>
      <Dashboard
        name={name}
        url={parentPath}
        links={React.Children.map(children, child => ({
          icon: child.props.icon,
          name: child.props.name,
          to: parentPath + '/' + kebabize(child.props.name),
        }))}
      />
      <Switch>
        {children
          ? React.Children.map(children, (organ, i) => {
              const { name: organName } = organ.props;
              let path = parentPath + '/' + kebabize(organName);
              if (i === 0) {
                firstChildPath = path;
              }
              return <Route render={() => <Organ {...organ.props} path={path} />} path={path} />;
            })
          : null}
        {render ? (
          <Route exact render={render} />
        ) : children ? (
          <Route render={() => <Redirect to={firstChildPath} />} />
        ) : (
          <Route render={() => <Redirect to="/not-found" />} />
        )}
      </Switch>
    </React.Fragment>
  );
};

export default withRouter(Organism);
