import React from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Input, Button, Checkbox } from 'semantic-ui-react';

const row = (item, { checkStatus, changeStatus }) => (
  <Table.Row key={item.citizenId}>
    <Table.Cell>{`${item.firstName} 
    ${item.lastName}`}
    </Table.Cell>
    <Table.Cell>{`${item.firstNameTh}
    ${item.lastNameTh}`}
    </Table.Cell>
    <Table.Cell>{`${item.position.join('/\n')}`}</Table.Cell>
    <Table.Cell>{`${item.email}`}</Table.Cell>
    <Table.Cell>{`${item.mobileNumber}`}</Table.Cell>
    <Table.Cell><Icon name="file pdf outline" /></Table.Cell>
    <Table.Cell>{`${item.citizenId}`}</Table.Cell>
    <Table.Cell>{`${item.registrationDate}`}</Table.Cell>
    <Table.Cell>{`${item.status}`}</Table.Cell>
    <Table.Cell><Checkbox name="blacklist" checked={checkStatus[item.citizenId] === 'Blacklist'} onChange={() => changeStatus(item.citizenId, 'Blacklist')} /></Table.Cell>
  </Table.Row>
);

const AllTable = ({ data, onSearchChange, sortKey, direction, handleSort, onConfirm, checkStatus, changeStatus, clearStatus }) => (
  <div>
    <Input icon="search" placeholder="Search projects..." onChange={onSearchChange} />
    <Table striped sortable selectable celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell sorted={sortKey === 'nameEN' ? direction : null} onClick={() => handleSort('nameEN')}>Name</Table.HeaderCell>
          <Table.HeaderCell sorted={sortKey === 'nameTH' ? direction : null} onClick={() => handleSort('nameTH')}>ชื่อ-นามสกุล</Table.HeaderCell>
          <Table.HeaderCell sorted={sortKey === 'position' ? direction : null} onClick={() => handleSort('position')}>Position</Table.HeaderCell>
          <Table.HeaderCell sorted={sortKey === 'email' ? direction : null} onClick={() => handleSort('email')}>Email</Table.HeaderCell>
          <Table.HeaderCell sorted={sortKey === 'phone' ? direction : null} onClick={() => handleSort('phone')}>Phone</Table.HeaderCell>
          <Table.HeaderCell >File</Table.HeaderCell>
          <Table.HeaderCell sorted={sortKey === 'citizenId' ? direction : null} onClick={() => handleSort('citizenId')}>Citizen ID</Table.HeaderCell>
          <Table.HeaderCell sorted={sortKey === 'registrationDate' ? direction : null} onClick={() => handleSort('registrationDate')}>Registration Date</Table.HeaderCell>
          <Table.HeaderCell sorted={sortKey === 'status' ? direction : null} onClick={() => handleSort('status')}>Status</Table.HeaderCell>
          <Table.HeaderCell >Blacklist</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(item => row(item, { checkStatus, changeStatus }))}
      </Table.Body>
      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell colSpan="11">
            <Button.Group floated="right">
              <Button color="blue" icon onClick={onConfirm} >
                Confirm
              </Button>
              <Button.Or />
              <Button basic color="red" icon onClick={clearStatus} >
                Select None
              </Button>
            </Button.Group>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  </div>
);

AllTable.propTypes = {
  data: PropTypes.array.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  sortKey: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  handleSort: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  checkStatus: PropTypes.object.isRequired,
  changeStatus: PropTypes.func.isRequired,
  clearStatus: PropTypes.func.isRequired,
};

export default AllTable;
