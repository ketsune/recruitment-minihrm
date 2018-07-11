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
    <Table.Cell>{`${item.interviewDate}  ${item.interviewTime}`}</Table.Cell>
    {/* <Table.Cell>{`${item.status}`}</Table.Cell> */}
    <Table.Cell><Checkbox name="accept" checked={checkStatus[item.citizenId] === 'Sign Contract'} onChange={() => changeStatus(item.citizenId, 'Sign Contract')} /></Table.Cell>
    {reject && <Table.Cell><Checkbox name="reject" checked={checkStatus[item.citizenId] === 'Reject'} onChange={() => changeStatus(item.citizenId, 'Reject')} /></Table.Cell>}
    <Table.Cell><Checkbox name="blacklist" checked={checkStatus[item.citizenId] === 'Blacklist'} onChange={() => changeStatus(item.citizenId, 'Blacklist')} /></Table.Cell>
  </Table.Row>
);

const PassTable = ({ data, onSearchChange, sortKey, direction, handleSort, onConfirm, checkStatus, reject, changeStatus, clearStatus, setPassDate, setPassTime }) => (
  <div>
    <Input icon="search" placeholder="Search projects..." onChange={onSearchChange} />
    <div style={{ overflowX: 'auto' }}>
      <Table striped sortable selectable celled >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell sorted={sortKey === 'firstName' ? direction : null} onClick={() => handleSort('firstName')}>Name</Table.HeaderCell>
            <Table.HeaderCell sorted={sortKey === 'firstNameTh' ? direction : null} onClick={() => handleSort('firstNameTh')}>ชื่อ-นามสกุล</Table.HeaderCell>
            <Table.HeaderCell sorted={sortKey === 'position' ? direction : null} onClick={() => handleSort('position')}>Position</Table.HeaderCell>
            <Table.HeaderCell sorted={sortKey === 'email' ? direction : null} onClick={() => handleSort('email')}>Email</Table.HeaderCell>
            <Table.HeaderCell sorted={sortKey === 'mobileNumber' ? direction : null} onClick={() => handleSort('mobileNumber')}>Phone</Table.HeaderCell>
            <Table.HeaderCell >File</Table.HeaderCell>
            <Table.HeaderCell >Exam</Table.HeaderCell>
            <Table.HeaderCell sorted={sortKey === 'interviewDate' ? direction : null} onClick={() => handleSort('interviewDate')}>Interview Date/Time</Table.HeaderCell>
            {/* <Table.HeaderCell >Status</Table.HeaderCell> */}
            <Table.HeaderCell >Sign Contract</Table.HeaderCell>
            {reject && <Table.HeaderCell >Reject</Table.HeaderCell>}
            <Table.HeaderCell >Blacklist</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map(item => row(item, { checkStatus, reject, changeStatus }))}
        </Table.Body>
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan="4">
              <Form onSubmit={onConfirm}>
                <Form.Group floated="left">
                  <Field name="date" as={Form.Input} component={Input} label="Date" placeholder="Ex. 2018-07-23" type="date" onChange={(event, value) => setPassDate(value)} />
                  <Field name="time" as={Form.Input} component={Input} label="Time" placeholder="Ex. 14:30:00" type="time" onChange={(event, value) => setPassTime(value)} />
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
  </div>
);

const selector = formValueSelector('dateTime');

const mapStateToProps = state => ({
  date: selector(state, 'date'),
  Time: selector(state, 'time')
});

const mapDispatchToProps = dispatch => ({
  setPassDate: value => dispatch(setDate(value)),
  setPassTime: value => dispatch(setTime(value))
});

PassTable.defaultProps = {
  reject: false,
};

PassTable.propTypes = {
  data: PropTypes.array.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  sortKey: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
  handleSort: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  checkStatus: PropTypes.object.isRequired,
  reject: PropTypes.bool,
  changeStatus: PropTypes.func.isRequired,
  clearStatus: PropTypes.func.isRequired,
  setPassDate: PropTypes.func.isRequired,
  setPassTime: PropTypes.func.isRequired,
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

export default enhance(PassTable);
