import React from 'react';
import ControlPanel from '../../../common/ControlPanel';
import TableRow, { Table, Popup, Label } from 'semantic-ui-react';
import Link from 'react-router-dom/Link';
import TableWithSorting from '../../../common/TableWithSorting';
import styled from 'styled-components';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import Api from '../../../common/Api';
import TableCell from 'semantic-ui-react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';
import { Page, MapButton } from '../../../common';
const MyLabel = styled(Label)`
  &&& {
  }
`;
class ViewLandUnit extends React.Component {
  state = {
    crop: null,
    toDoTasks: null,
  };
  handleSuccess = data => {
    this.setState({ crop: data });
    this.setState({ toDoTasks: data.toDoTasks });
  };
  handleDataChange = data => {
    this.setState({ crop: data });
    this.setState({ toDoTasks: data.toDoTasks });
  };

  render() {
    const { crop, toDoTasks } = this.state;
    console.log(crop);
    console.log(toDoTasks);

    return (
      <Api url={'/Crops/' + this.props.match.params.id} onSuccess={this.handleSuccess}>
        {crop !== null ? (
          <React.Fragment>
            <ControlPanel title={'Crop / ' + crop.key} className="no-print">
              <Page>
                {' '}
                <MyLabel ui red ribbon label>
                  Crop Details
                </MyLabel>
                <TableWithSorting sortBy="key" sortIn="desc" data={crop} onDataChange={this.props.handleDataChange}>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell field="key" type="text">
                        Key
                      </Table.HeaderCell>
                      <Table.HeaderCell field="Name" type="text">
                        Name
                      </Table.HeaderCell>
                      <Table.HeaderCell field="Period" type="text">
                        Period
                      </Table.HeaderCell>
                      <Table.HeaderCell field="CropSpacing" type="text">
                        CropSpacing
                      </Table.HeaderCell>
                      <Table.HeaderCell field="RowSpacing" type="text">
                        RowSpacing
                      </Table.HeaderCell>
                      <Table.HeaderCell field="Type" type="date">
                        Type
                      </Table.HeaderCell>
                      <Table.HeaderCell field="TargetWareHouse" type="text">
                        TargetWareHouse
                      </Table.HeaderCell>
                      <Table.HeaderCell field="createdByUserName" type="text">
                        Created By
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Table.Row key={crop.id}>
                      <Table.Cell>{crop.key}</Table.Cell>
                      <Table.Cell>{crop.name}</Table.Cell>
                      <Table.Cell>{crop.period}</Table.Cell>
                      <Table.Cell>{crop.cropSpacing}</Table.Cell>
                      <Table.Cell>{crop.rowSpacing}</Table.Cell>
                      <Table.Cell>{crop.type}</Table.Cell>
                      <Table.Cell>{crop.targetWareHouse}</Table.Cell>
                      <Table.Cell>{crop.createdByUserName}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </TableWithSorting>
                <MyLabel ui red ribbon label>
                  Task Details
                </MyLabel>
                <TableWithSorting sortBy="key" sortIn="desc" data={crop.toDoTasks} onDataChange={this.props.handleDataChange}>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell field="key" type="text">
                        Key
                      </Table.HeaderCell>
                      <Table.HeaderCell field="TaskName" type="text">
                        TaskName
                      </Table.HeaderCell>
                      <Table.HeaderCell field="StartDay" type="text">
                        StartDay
                      </Table.HeaderCell>
                      <Table.HeaderCell field="EndDay" type="text">
                        EndDay
                      </Table.HeaderCell>
                      <Table.HeaderCell field="AssignedDate" type="text">
                        AssignedDate
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {_.map(toDoTasks, ({ id, key, name, startDay, endDay, assignedDate }) => (
                      <Table.Row key={id}>
                        <Table.Cell>{key}</Table.Cell>
                        <Table.Cell>{name}</Table.Cell>
                        <Table.Cell>{startDay}</Table.Cell>
                        <Table.Cell>{endDay}</Table.Cell>
                        <Table.Cell>{assignedDate}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </TableWithSorting>
                <MapButton onClick={this.deleteLandUnit}> Delete </MapButton>
              </Page>
            </ControlPanel>
          </React.Fragment>
        ) : (
          ''
        )}
      </Api>
    );
  }
}
export default ViewLandUnit;
