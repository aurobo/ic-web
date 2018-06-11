import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Tissue } from '@aurobo/anatomy';
import { kebabize } from '../utils';
import { TopNav, DropdownLink } from '@aurobo/components';
import { Dropdown } from 'semantic-ui-react';

class Organ extends React.Component {
  render() {
    const { children, path, name, renderExact, renderCommon } = this.props;
    let firstChildPath = null;
    return (
      <React.Fragment>
        <TopNav menuHeader={name} url={path}>
          {React.Children.map(children, tissue => {
            const { name: tissueName, children } = tissue.props;
            let tissuePath = path + '/' + kebabize(tissueName);
            return children ? (
              <Dropdown item text={tissueName} simple>
                <Dropdown.Menu>
                  {React.Children.map(children, cell => {
                    const { name: cellName } = cell.props;
                    let cellPath = tissuePath + '/' + kebabize(cellName);
                    return <DropdownLink to={cellPath}>{cellName}</DropdownLink>;
                  })}
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <DropdownLink darkmode="true" to={tissuePath}>
                {tissueName}
              </DropdownLink>
            );
          })}
        </TopNav>
        <Switch>
          {React.Children.map(children, (tissue, i) => {
            const { name: tissueName } = tissue.props;
            let tissuePath = path + '/' + kebabize(tissueName);
            if (i === 0) {
              firstChildPath = tissuePath;
            }
            return <Route render={() => <Tissue {...tissue.props} path={tissuePath} />} path={tissuePath} />;
          })}
          {renderExact || renderCommon ? (
            <Route exact render={renderExact} />
          ) : children ? (
            <Route render={() => <Redirect to={firstChildPath} />} />
          ) : (
            <Route render={() => <Redirect to="/not-found" />} />
          )}
        </Switch>
        {renderCommon ? renderCommon() : null}
      </React.Fragment>
    );
  }
}

export default Organ;
