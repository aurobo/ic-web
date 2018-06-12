import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Organ } from '@aurobo/anatomy';
import { Dashboard } from '@aurobo/components';
import { kebabize } from '../utils';
import { TopNav } from '@aurobo/components';

class Organism extends React.Component {
  render() {
    const { children, name, renderExact, renderCommon } = this.props;
    let path = '/' + kebabize(name);
    return (
      <React.Fragment>
        <Route
          exact
          path={path}
          render={() => (
            <Dashboard
              renderTopNav={() => <TopNav menuHeader={name} url={path} />}
              links={React.Children.map(children, child => ({
                iconProps: child.props.iconProps,
                name: child.props.name,
                to: path + '/' + kebabize(child.props.name),
              }))}
            />
          )}
        />
        <Switch>
          {children
            ? React.Children.map(children, (organ, i) => {
                const { name: organName } = organ.props;
                let organPath = path + '/' + kebabize(organName);
                return <Route render={() => <Organ {...organ.props} path={organPath} />} path={organPath} />;
              })
            : null}
        </Switch>
        {renderCommon ? renderCommon() : null}
        {renderExact ? renderExact() : null}
      </React.Fragment>
    );
  }
}

export default Organism;
