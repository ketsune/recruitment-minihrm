import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { Form, Table } from 'semantic-ui-react';
import { compose } from 'recompose';
import { reduxForm, Field } from 'redux-form';
import Input from '../../components/Input';
// import { updateRecruitmentNoteRequest } from '../../actions/recruitment';
// import Input from '../../components/Input';
// import * as validator from '../../utils/validator';

// const validate = (values) => {
//   const errors = {};
//   errors.firstName = validator.required(values.firstName);
//   errors.lastName = validator.required(values.lastName);
//   errors.email = validator.email(values.email);
//   return errors;
// };

const row = (item, { checkStatus, date, time, submitting }) => (
  <Table.Row key={item.citizenId}>
    {checkStatus[item.citizenId] && <Table.Cell>{`${item.firstName} ${item.lastName}`}</Table.Cell>}
    {checkStatus[item.citizenId] && checkStatus[item.citizenId] !== 'Pass' && <Table.Cell>{checkStatus[item.citizenId]}</Table.Cell>}
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
    {(checkStatus[item.citizenId] === 'Approve' || checkStatus[item.citizenId] === 'Sign Contract') && <Table.Cell>Date : {date}, Time: {time}</Table.Cell>}
    {(checkStatus[item.citizenId] === 'Complete') && <Table.Cell>Date : {date}</Table.Cell>}
  </Table.Row>
);
// const EditRecruitmentForm = ({ data, checkStatus, onConfirm, date, time }) => (
const EditRecruitmentForm = ({ data, checkStatus, date, time, handleSubmit, submitting }) => (
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
        {data.map(item => row(item, { checkStatus, date, time, submitting }))}
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
};

// const mapStateToProps = state => ({
//   initialValues: {
//     // userId: state.profile.general.userId,
//     // firstName: state.profile.general.firstName,
//   }
// // });
// const mapDispatchToProps = dispatch => ({
//   onSubmit: values => new Promise((resolve, reject) => {
//     dispatch(updateRecruitmentNoteRequest({ values, resolve, reject }));
//   })
// });
// const selector = formValueSelector('editRecruitment'); // <-- same as form name

const enhance = compose(reduxForm({
  form: 'editRecruitment',
}));

export default enhance(EditRecruitmentForm);
