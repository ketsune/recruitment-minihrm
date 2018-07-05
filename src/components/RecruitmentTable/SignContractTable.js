import React from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Input, Button, Checkbox, Form } from 'semantic-ui-react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { setDate, setTime } from '../../actions/recruitment';

const row = (item, { checkStatus, reject, changeStatus }) => (
  <Table.Row key={item.citizenId}>
    <Table.Cell collapsing>{`${item.firstName}`}<br />
      {`${item.lastName}`}
    </Table.Cell>
    <Table.Cell collapsing>{`${item.firstNameTh}`}<br />
      {`${item.lastNameTh}`}
    </Table.Cell>
    <Table.Cell>{`${item.position.join('\n')}`}</Table.Cell>
    <Table.Cell>{`${item.email}`}</Table.Cell>
    <Table.Cell collapsing>{`${item.mobileNumber}`}</Table.Cell>
    <Table.Cell><Icon name="file pdf outline" /></Table.Cell>
    <Table.Cell><Icon name="clipboard" /></Table.Cell>
    <Table.Cell>{`${item.signDate} ${item.signTime}`}</Table.Cell>
    {/* <Table.Cell>{`${item.status}`}</Table.Cell> */}
    <Table.Cell><Checkbox name="accept" checked={checkStatus[item.citizenId] === 'Complete'} onChange={() => changeStatus(item.citizenId, 'Complete')} /></Table.Cell>
    {reject && <Table.Cell><Checkbox name="reject" checked={checkStatus[item.citizenId] === 'Cancel'} onChange={() => changeStatus(item.citizenId, 'Cancel')} /></Table.Cell>}
    <Table.Cell><Checkbox name="edit" checked={checkStatus[item.citizenId] === 'Sign Contract'} onChange={() => changeStatus(item.citizenId, 'Sign Contract')} /></Table.Cell>
    <Table.Cell><Checkbox name="blacklist" checked={checkStatus[item.citizenId] === 'Blacklist'} onChange={() => changeStatus(item.citizenId, 'Blacklist')} /></Table.Cell>
  </Table.Row>
);

const SignContractTable = ({ data, onSearchChange, sortKey, direction, handleSort, onConfirm, checkStatus, reject, changeStatus, clearStatus, setSignDate, setSignTime }) => (
  <div>
    <Input icon="search" placeholder="Search projects..." onChange={onSearchChange} />
    <Table striped sortable selectable celled style={{ overflowX: 'auto' }}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell sorted={sortKey === 'nameEN' ? direction : null} onClick={() => handleSort('nameEN')}>Name</Table.HeaderCell>
          <Table.HeaderCell sorted={sortKey === 'nameTH' ? direction : null} onClick={() => handleSort('nameTH')}>ชื่อ-นามสกุล</Table.HeaderCell>
          <Table.HeaderCell sorted={sortKey === 'position' ? direction : null} onClick={() => handleSort('position')}>Position</Table.HeaderCell>
          <Table.HeaderCell sorted={sortKey === 'email' ? direction : null} onClick={() => handleSort('email')}>Email</Table.HeaderCell>
          <Table.HeaderCell sorted={sortKey === 'phone' ? direction : null} onClick={() => handleSort('phone')}>Phone</Table.HeaderCell>
          <Table.HeaderCell >File</Table.HeaderCell>
          <Table.HeaderCell >Exam</Table.HeaderCell>
          <Table.HeaderCell sorted={sortKey === 'signDate' ? direction : null} onClick={() => handleSort('signDate')}>Sign Date/Time</Table.HeaderCell>
          {/* <Table.HeaderCell >Status</Table.HeaderCell> */}
          <Table.HeaderCell >Complete</Table.HeaderCell>
          {reject && <Table.HeaderCell >Cancel</Table.HeaderCell>}
          <Table.HeaderCell >Edit Date</Table.HeaderCell>
          <Table.HeaderCell >Blacklist</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(item => row(item, { checkStatus, reject, changeStatus }))}
      </Table.Body>
      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell colSpan="5">
            <Form onSubmit={onConfirm}>
              <Form.Group floated="left">
                <Field name="date" as={Form.Input} component={Input} label="Data" placeholder="Ex. 2018-07-23" type="date" onChange={(event, value) => setSignDate(value)} />
                <Field name="time" as={Form.Input} component={Input} label="Time" placeholder="Ex. 14:30:00" type="time" onChange={(event, value) => setSignTime(value)} />
              </Form.Group>
            </Form>
          </Table.HeaderCell>
          <Table.HeaderCell colSpan="7">
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
  Time: selector(state, 'time')
});

const mapDispatchToProps = dispatch => ({
  setSignDate: value => dispatch(setDate(value)),
  setSignTime: value => dispatch(setTime(value))
});

SignContractTable.defaultProps = {
  reject: false,
};

SignContractTable.propTypes = {
  data: PropTypes.array.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  sortKey: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  handleSort: PropTypes.func.isRequired,
  checkStatus: PropTypes.object.isRequired,
  onConfirm: PropTypes.func.isRequired,
  reject: PropTypes.bool,
  changeStatus: PropTypes.func.isRequired,
  clearStatus: PropTypes.func.isRequired,
  setSignDate: PropTypes.func.isRequired,
  setSignTime: PropTypes.func.isRequired,
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


export default enhance(SignContractTable);
