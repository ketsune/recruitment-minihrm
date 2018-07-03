import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Table, Icon, Input, Button, Checkbox, Form } from 'semantic-ui-react';
import { setDate } from '../../actions/recruitment';

const row = (item, { checkStatus, changeStatus }) => (
  <Table.Row key={item.citizenId}>
    <Table.Cell collapsing>{`${item.firstName}`}<br />
      {`${item.lastName}`}
    </Table.Cell>
    <Table.Cell collapsing>{`${item.firstNameTh}`}<br />
      {`${item.lastNameTh}`}
    </Table.Cell>
    <Table.Cell>{`${item.position.join('\n')}`}</Table.Cell>
    <Table.Cell>{`${item.email}`}</Table.Cell>
    <Table.Cell>{`${item.mobileNumber}`}</Table.Cell>
    <Table.Cell><Icon name="file pdf outline" /></Table.Cell>
    <Table.Cell><Icon name="clipboard" /></Table.Cell>
    <Table.Cell>{`${item.firstDate}`}</Table.Cell>
    <Table.Cell><Checkbox name="edit" checked={checkStatus[item.citizenId] === 'Complete'} onChange={() => changeStatus(item.citizenId, 'Complete')} /></Table.Cell>
    {/* <Table.Cell>{`${item.status}`}</Table.Cell> */}
    <Table.Cell><Checkbox name="blacklist" checked={checkStatus[item.citizenId] === 'Blacklist'} onChange={() => changeStatus(item.citizenId, 'Blacklist')} /></Table.Cell>
  </Table.Row>
);

const CompleteTable = ({ data, onSearchChange, sortKey, direction, handleSort, onConfirm, checkStatus, changeStatus, clearStatus, setCompleteDate }) => (
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
          <Table.HeaderCell >Exam</Table.HeaderCell>
          <Table.HeaderCell sorted={sortKey === 'firstDate' ? direction : null} onClick={() => handleSort('firstDate')}>First Date</Table.HeaderCell>
          <Table.HeaderCell >Edit Date</Table.HeaderCell>
          {/* <Table.HeaderCell >Status</Table.HeaderCell> */}
          <Table.HeaderCell >Blacklist</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(item => row(item, { checkStatus, changeStatus }))}
      </Table.Body>
      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell colSpan="3">
            <Form onSubmit={onConfirm}>
              <Form.Group floated="left">
                <Field name="date" as={Form.Input} component={Input} label="Data" placeholder="Ex. 2018-07-23" type="date" onChange={(event, value) => setCompleteDate(value)} />
              </Form.Group>
            </Form>
          </Table.HeaderCell>
          <Table.HeaderCell colSpan="8">
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

const selector = formValueSelector('dateTime');

const mapStateToProps = state => ({
  date: selector(state, 'date'),
});

const mapDispatchToProps = dispatch => ({
  setCompleteDate: value => dispatch(setDate(value)),
});

CompleteTable.propTypes = {
  data: PropTypes.array.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  sortKey: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  handleSort: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  checkStatus: PropTypes.object.isRequired,
  changeStatus: PropTypes.func.isRequired,
  setCompleteDate: PropTypes.func.isRequired,
  clearStatus: PropTypes.func.isRequired,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'dateTime',
    initialValues: {
      date: null,
      time: null,
    },
  })
);

export default enhance(CompleteTable);
