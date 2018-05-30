import ControlPanel from '@innovic/components/shared/ControlPanel';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup/Popup';
import Tab from 'semantic-ui-react/dist/commonjs/modules/Tab/Tab';
import { Segment, Menu, Label, Icon, Table, Button, Checkbox } from 'semantic-ui-react';
import { Link, Route } from 'react-router-dom';
import { FlatButton } from '@innovic/components/shared';
import React from 'react';
import Plasma, { Firestore } from '@innovic/plasma';
import styled from 'styled-components';
import firebase from 'firebase/app';

const TabItem = ({ to, children, ...rest }) => {
  return to ? (
    <Link to={to}>
      <Menu.Item as="span" {...rest}>
        {children}
      </Menu.Item>
    </Link>
  ) : (
    <Menu.Item {...rest}>{children}</Menu.Item>
  );
};

const StyledTabItem = styled(TabItem)`
  &&&&&& {
    border-radius: 0 !important;
    border-top: none;
  }
`;

const Close = styled(Icon).attrs({ name: 'close' })`
  &&&&&& {
    position: relative;
    right: 0;
    margin-left: 10px;
    margin-right: 0;
    z-index: 99999;
  }

  &&&:hover {
    color: red;
  }
`;

class SalesOrders extends React.Component {
  state = {
    panes: [],
    activeIndex: 0,
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      this.openTab(null, this.props.match.params.id);
    }
  }

  closeTab = (e, id) => {
    const panes = this.state.panes.filter(x => x.id !== id);
    this.setState({ panes });
  };

  openTab = (e, id) => {
    const panes = [...this.state.panes];
    panes.push({
      id: id,
      menuItem: (
        <StyledTabItem key={id} to={'/sales/sales-orders/' + id + '/view'}>
          {id} <Close onClick={e => this.closeTab(e, id)} />
        </StyledTabItem>
      ),
      pane: (
        <Tab.Pane key={id}>
          <Firestore.Document path={'salesOrders/' + id} schemaless>
            {({ doc, isLoading, error }) => (
              <div>{isLoading ? 'Loading...' : error ? error.message : JSON.stringify(doc)}</div>
            )}
          </Firestore.Document>
        </Tab.Pane>
      ),
    });
    this.props.history.push('/sales/sales-orders/' + id + '/view');
    this.setState({ panes, activeIndex: panes.length });
  };

  handleTabChange = (e, data) => {
    this.setState({ activeIndex: data.activeIndex });
  };

  render() {
    const { panes, activeIndex } = this.state;
    return (
      <Plasma.Provider instance={firebase}>
        <ControlPanel title="Sales Orders">
          <FlatButton size="tiny" primary disabled>
            Create
          </FlatButton>
          <Link to="/sales/import-excel">
            <FlatButton size="tiny">Import</FlatButton>
          </Link>
        </ControlPanel>
        <Tab
          onTabChange={this.handleTabChange}
          activeIndex={activeIndex}
          renderActiveOnly={false}
          panes={[
            {
              id: 'all',
              menuItem: (
                <StyledTabItem key="all" to="/sales/sales-orders">
                  All
                </StyledTabItem>
              ),
              pane: (
                <Tab.Pane key="all">
                  <Firestore.Collection path="salesOrders" schemaless>
                    {({ collection, isLoading, error }) => (
                      <div>
                        {isLoading ? (
                          'Loading...'
                        ) : error ? (
                          error.message
                        ) : (
                          <Table celled fixed singleLine selectable>
                            <Table.Header>
                              <Table.Row>
                                <Table.HeaderCell>Id</Table.HeaderCell>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                                <Table.HeaderCell>Description</Table.HeaderCell>
                              </Table.Row>
                            </Table.Header>

                            <Table.Body>
                              {collection.map(doc => (
                                <Table.Row
                                  key={doc.id}
                                  style={{ cursor: 'pointer' }}
                                  onClick={e => this.openTab(e, doc.id)}
                                >
                                  <Table.Cell>{doc.id}</Table.Cell>
                                  <Table.Cell>Approved</Table.Cell>
                                  <Table.Cell>Shorter description</Table.Cell>
                                </Table.Row>
                              ))}
                            </Table.Body>
                          </Table>
                        )}
                      </div>
                    )}
                  </Firestore.Collection>
                </Tab.Pane>
              ),
            },
            ...panes,
          ]}
        />
      </Plasma.Provider>
    );
  }
}

export default SalesOrders;
