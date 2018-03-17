import _ from 'lodash';
import React from 'react';
import { StyledTable } from '.';
import { Table, Dimmer, Loader, Segment } from 'semantic-ui-react';
import styled from 'styled-components';

const SimpleSegment = styled(Segment)`
  &&& {
    padding: 0;
    margin: 0;
  }
`;

function withSorting(WrappedComponent) {
  return class extends React.Component {
    state = {
      column: this.props.sortBy,
      direction: null,
    };

    componentWillReceiveProps(nextProps) {
      if (this.props.data === null && nextProps.data !== null) {
        this.props.onDataChange(_.orderBy(nextProps.data, [this.props.sortBy], [this.props.sortIn]));
      }
    }

    handleSort = (clickedColumn, type) => () => {
      const { column, direction } = this.state;
      const { data } = this.props;
      if (column !== clickedColumn) {
        this.setState({
          column: clickedColumn,
          direction: 'ascending',
        });
        switch (type) {
          case 'text':
            this.props.onDataChange(_.sortBy(data, [clickedColumn]));
            break;
          case 'date':
            this.props.onDataChange(_.sortBy(data, item => new Date(item)));
            break;
          case 'number':
            break;
          default:
            break;
        }
        return;
      }

      this.setState({
        direction: direction === 'ascending' ? 'descending' : 'ascending',
      });

      this.props.onDataChange(data.reverse());
    };

    render() {
      const { column, direction } = this.state;
      const { data, onDataChange, loading, sortBy, sortIn, ...otherProps } = this.props;
      return (
        <SimpleSegment basic>
          <Dimmer active={loading} inverted>
            <Loader size="large" />
          </Dimmer>

          <WrappedComponent sortable celled {...otherProps}>
            {React.Children.map(this.props.children, child => {
              if (child.type.name === 'TableHeader') {
                return React.cloneElement(
                  child,
                  child.props,
                  React.Children.map(child.props.children, child => {
                    if (child.type.name === 'TableRow') {
                      return React.cloneElement(
                        child,
                        child.props,
                        React.Children.map(child.props.children, child => {
                          if (child.type.name === 'TableHeaderCell') {
                            return (
                              <Table.HeaderCell
                                sorted={column === child.props.field ? direction : null}
                                onClick={this.handleSort(child.props.field, child.props.type)}
                              >
                                {child.props.children}
                              </Table.HeaderCell>
                            );
                          } else {
                            return child;
                          }
                        })
                      );
                    } else {
                      return child;
                    }
                  })
                );
              }
              return child;
            })}
          </WrappedComponent>
        </SimpleSegment>
      );
    }
  };
}

const TableWithSorting = withSorting(StyledTable);

export default TableWithSorting;
