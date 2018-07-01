import React from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Input, Button, Checkbox } from 'semantic-ui-react';

const row = (item, { checkStatus, reject, changeStatus }) => (
  <Table.Row key={item.citizenId}>
    <Table.Cell>{`${item.firstName}
      ${item.lastName}`}
    </Table.Cell>
    <Table.Cell>{`${item.firstNameTh}
      ${item.lastNameTh}`}
    </Table.Cell>
    <Table.Cell>{`${item.position.join('\n')}`}</Table.Cell>
    <Table.Cell>{`${item.email}`}</Table.Cell>
    <Table.Cell>{`${item.mobileNumber}`}</Table.Cell>
    <Table.Cell><Icon name="file pdf outline" /></Table.Cell>
    <Table.Cell><Icon name="clipboard" /></Table.Cell>
    <Table.Cell>{`${item.interviewDate}`}</Table.Cell>
    {/* <Table.Cell>{`${item.status}`}</Table.Cell> */}
    <Table.Cell><Checkbox name="accept" checked={checkStatus[item.citizenId] === 'Pass'} onChange={() => changeStatus(item.citizenId, 'Pass')} /></Table.Cell>
    {reject && <Table.Cell><Checkbox name="reject" checked={checkStatus[item.citizenId] === 'Fail'} onChange={() => changeStatus(item.citizenId, 'Fail')} /></Table.Cell>}
  </Table.Row>
);

const InProgressTable = ({ data, onSearchChange, sortKey, direction, handleSort, onConfirm, checkStatus, reject, changeStatus, clearStatus }) => (
  <div>
    <Input icon="search" placeholder="Search projects..." onChange={onSearchChange} />
    <Table striped sortable selectable celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell sorted={sortKey === 'nameEN' ? direction : null} onClick={() => handleSort('nameEN')}>Name-EN</Table.HeaderCell>
          <Table.HeaderCell sorted={sortKey === 'nameTH' ? direction : null} onClick={() => handleSort('nameTH')}>Name-TH</Table.HeaderCell>
          <Table.HeaderCell sorted={sortKey === 'position' ? direction : null} onClick={() => handleSort('position')}>Position</Table.HeaderCell>
          <Table.HeaderCell sorted={sortKey === 'email' ? direction : null} onClick={() => handleSort('email')}>Email</Table.HeaderCell>
          <Table.HeaderCell sorted={sortKey === 'phone' ? direction : null} onClick={() => handleSort('phone')}>Phone</Table.HeaderCell>
          <Table.HeaderCell >File</Table.HeaderCell>
          <Table.HeaderCell >Exam</Table.HeaderCell>
          <Table.HeaderCell sorted={sortKey === 'interviewDate' ? direction : null} onClick={() => handleSort('interviewDate')}>Interview Date</Table.HeaderCell>
          {/* <Table.HeaderCell >Status</Table.HeaderCell> */}
          <Table.HeaderCell >Pass</Table.HeaderCell>
          {reject && <Table.HeaderCell >Fail</Table.HeaderCell>}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(item => row(item, { checkStatus, reject, changeStatus }))}
      </Table.Body>
      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell colSpan="11">
            <Button color="blue" icon floated="right" onClick={onConfirm} >
              Confirm
            </Button>
            <Button color="blue" icon floated="right" onClick={clearStatus} >
              Reset
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  </div>
);

InProgressTable.defaultProps = {
  reject: false,
};

InProgressTable.propTypes = {
  data: PropTypes.array.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  sortKey: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  handleSort: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  checkStatus: PropTypes.array.isRequired,
  reject: PropTypes.bool,
  changeStatus: PropTypes.func.isRequired,
  clearStatus: PropTypes.func.isRequired,
};

export default InProgressTable;
