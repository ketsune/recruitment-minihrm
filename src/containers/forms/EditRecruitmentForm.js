import React from 'react';
import PropTypes from 'prop-types';
import { Form, Table } from 'semantic-ui-react';
import { compose } from 'recompose';
import { reduxForm } from 'redux-form';
// import Input from '../../components/Input';
// import * as validator from '../../utils/validator';

// const validate = (values) => {
//   const errors = {};
//   errors.firstName = validator.required(values.firstName);
//   errors.lastName = validator.required(values.lastName);
//   errors.email = validator.email(values.email);
//   return errors;
// };

const row = (item, { checkStatus, date, time }) => (
  <Table.Row key={item.citizenId}>
    {checkStatus[item.citizenId] && <Table.Cell>{`${item.firstName} ${item.lastName}`}</Table.Cell>}
    {checkStatus[item.citizenId] && <Table.Cell>{checkStatus[item.citizenId]}</Table.Cell>}
    {(checkStatus[item.citizenId] === 'Reject' || checkStatus[item.citizenId] === 'Fail' || checkStatus[item.citizenId] === 'Cancel' || checkStatus[item.citizenId] === 'Blacklist') && <Table.Cell><input /></Table.Cell>}
    {(checkStatus[item.citizenId] === 'Approve' || checkStatus[item.citizenId] === 'Sign Contract') && <Table.Cell>Date : {date},Time: {time}</Table.Cell>}
  </Table.Row>
);
// const EditRecruitmentForm = ({ data, checkStatus, onConfirm, date, time }) => (
const EditRecruitmentForm = ({ data, checkStatus, date, time }) => (
  // <Form onSubmit={onConfirm}>
  <Form>
    <Table>
      {/* <Form.Group widths="equal">
        <Field name="firstName" component={Input} as={Form.Input} label="First name" placeholder="First name" />
        <Field name="lastName" component={Input} as={Form.Input} label="Last name" placeholder="Last name" />
      </Form.Group> */}
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell >Name</Table.HeaderCell>
          <Table.HeaderCell >Status</Table.HeaderCell>
          <Table.HeaderCell >Note</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(item => row(item, { checkStatus, date, time }))}
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
};

// const mapStateToProps = state => ({
//   initialValues: {
//     // userId: state.profile.general.userId,
//     // firstName: state.profile.general.firstName,
//   }
// });

const enhance = compose(reduxForm({
  form: 'editRecruitment'
}));

export default enhance(EditRecruitmentForm);
