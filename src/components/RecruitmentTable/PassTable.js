import React from 'react';
import PropTypes from 'prop-types';
import { Table, Icon, Input, Button, Checkbox, Form, Grid } from 'semantic-ui-react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { setDate, setTime } from '../../actions/recruitment';


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
    <Table.Cell><Checkbox name="accept" checked={checkStatus[item.citizenId] === 'Sign Contract'} onChange={() => changeStatus(item.citizenId, 'Sign Contract')} /></Table.Cell>
    {reject && <Table.Cell><Checkbox name="reject" checked={checkStatus[item.citizenId] === 'Reject'} onChange={() => changeStatus(item.citizenId, 'Reject')} /></Table.Cell>}
  </Table.Row>
);

const PassTable = ({ data, onSearchChange, sortKey, direction, handleSort, onConfirm, checkStatus, reject, changeStatus, clearStatus, setDate, setTime }) => (
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
          <Table.HeaderCell >Sign Contract</Table.HeaderCell>
          {reject && <Table.HeaderCell >Reject</Table.HeaderCell>}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(item => row(item, { checkStatus, reject, changeStatus }))}
      </Table.Body>
      <Table.Footer fullWidth>

        <Table.Row>
          <Table.HeaderCell colSpan="11">
            <div>
              <Form onSubmit={onConfirm}>
                <Form.Group >
                  <Field name="date" as={Form.Input} component={Input} label="Data" placeholder="Date" type="date" onChange={(event, value) => setDate(value)} />
                  <Field name="time" as={Form.Input} component={Input} label="Time" placeholder="Time" type="time" onChange={(event, value) => setTime(value)} />
                </Form.Group>
              </Form>
            </div>
            <Button.Group floated="right">

              <Button positive icon onClick={onConfirm} >
                Confirm
              </Button>
              <Button.Or />
              <Button negative icon onClick={clearStatus} >
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
  setDate: (value) => dispatch(setDate(value)),
  setTime: (value) => dispatch(setTime(value))
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
  setDate: PropTypes.func.isRequired,
  setTime: PropTypes.func.isRequired,
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
