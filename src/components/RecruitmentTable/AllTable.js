import React from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Input } from 'semantic-ui-react';

const row = item => (
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
    <Table.Cell>{`${item.citizenId}`}</Table.Cell>
    <Table.Cell>{`${item.status}`}</Table.Cell>
  </Table.Row>
);

const AllTable = ({ data, onSearchChange, sortKey, direction, handleSort }) => (
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
          <Table.HeaderCell sorted={sortKey === 'citizenId' ? direction : null} onClick={() => handleSort('citizenId')}>Citizen ID</Table.HeaderCell>
          <Table.HeaderCell >Status</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(item => row(item))}
      </Table.Body>
      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell colSpan="11">
            {/* <Button color="blue" icon floated="right" onClick={onConfirm} >
              Confirm
            </Button>
            <Button color="blue" icon floated="right" onClick={clearStatus} >
              Reset
            </Button> */}
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
};

export default AllTable;
