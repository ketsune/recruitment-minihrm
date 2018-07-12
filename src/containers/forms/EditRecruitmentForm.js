import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Table, Dropdown } from 'semantic-ui-react';
import { compose, lifecycle } from 'recompose';
import { reduxForm, Field } from 'redux-form';
import Input from '../../components/Input';
import { fetchPositionRecruitmentRequest, setSelectPosition } from '../../actions/recruitment';
// import Input from '../../components/Input';
// import * as validator from '../../utils/validator';

// const validate = (values) => {
//   const errors = {};
//   errors.firstName = validator.required(values.firstName);
//   errors.lastName = validator.required(values.lastName);
//   errors.email = validator.email(values.email);
//   return errors;
// };

const row = (item, { checkStatus, date, time, submitting, positions, selectPosition }) => {
  const options = [];
  let key = 1;
  positions.map((position) => {
    const positionRow = {};
    positionRow.key = key;
    key += 1;
    positionRow.text = position;
    positionRow.value = position;
    options.push(positionRow);
    return '';
  });
  return (
    <Table.Row key={item.citizenId}>
      <Table.Cell>{`${item.firstName} ${item.lastName}`}</Table.Cell>
      {checkStatus[item.citizenId] !== 'Pass' && checkStatus[item.citizenId] !== 'Exam' && checkStatus[item.citizenId] !== 'Sign Contract' && <Table.Cell>{checkStatus[item.citizenId]}</Table.Cell>}
      {checkStatus[item.citizenId] === 'Exam' && <Table.Cell>Approve</Table.Cell>}
      {checkStatus[item.citizenId] === 'Pass' && <Table.Cell colSpan="2">{checkStatus[item.citizenId]}</Table.Cell>}
      {
        (checkStatus[item.citizenId] === 'Reject' ||
          checkStatus[item.citizenId] === 'Fail' ||
          checkStatus[item.citizenId] === 'Cancel' ||
          checkStatus[item.citizenId] === 'Blacklist')
        &&
        // <Table.Cell><input /></Table.Cell>
        <Table.Cell>
          {/* <Form onSubmit={handleSubmit}> */}
          <Form.Group widths="equal">
            <Field name={`note_${item.citizenId}`} as={Form.Input} component={Input} label="" placeholder="Note" disabled={submitting} />
          </Form.Group>
          {/* </Form> */}
        </Table.Cell>
      }
      {(checkStatus[item.citizenId] === 'Approve') && <Table.Cell>Interview Date : {date} ({time})</Table.Cell>}
      {(checkStatus[item.citizenId] === 'Exam') && <Table.Cell>Exam Date : {date} ({time})</Table.Cell>}
      {(checkStatus[item.citizenId] === 'Sign Contract') && <Table.Cell>Sign Contract Date : {date} ({time})</Table.Cell>}
      {(checkStatus[item.citizenId] === 'Complete') && <Table.Cell>Date : {date}</Table.Cell>}
      {(checkStatus[item.citizenId] === 'Sign Contract') && <Table.Cell><Dropdown placeholder="Please select a position." search selection options={options} onChange={(e, data) => selectPosition(data, item.citizenId)} /></Table.Cell>}
    </Table.Row>
  );
};
// const EditRecruitmentForm = ({ data, checkStatus, onConfirm, date, time }) => (
const EditRecruitmentForm = ({ data, checkStatus, date, time, handleSubmit, submitting, positions, selectPosition }) => (
  <Form onSubmit={handleSubmit}>
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell >Name</Table.HeaderCell>
          <Table.HeaderCell >Status</Table.HeaderCell>
          <Table.HeaderCell >Note</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(item => row(item, { checkStatus, date, time, submitting, positions, selectPosition }))}
      </Table.Body>
    </Table>
  </Form>

);

EditRecruitmentForm.propTypes = {
  data: PropTypes.array.isRequired,
  checkStatus: PropTypes.object.isRequired,
  // onConfirm: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  positions: PropTypes.array.isRequired,
  selectPosition: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  positions: state.recruitment.positions
});
const mapDispatchToProps = dispatch => ({
  fetchPositionRecruitment: () => dispatch(fetchPositionRecruitmentRequest()),
  selectPosition: (data, citizenId) => dispatch(setSelectPosition(citizenId, data.value)),
});
// const mapDispatchToProps = dispatch => ({
//   onSubmit: values => new Promise((resolve, reject) => {
//     dispatch(updateRecruitmentNoteRequest({ values, resolve, reject }));
//   })
// });
// const selector = formValueSelector('editRecruitment'); // <-- same as form name

const enhance = compose(
  reduxForm({
    form: 'editRecruitment',
  }),
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { fetchPositionRecruitment } = this.props;
      fetchPositionRecruitment();
    }
  })
);

export default enhance(EditRecruitmentForm);
