import React from 'react';
import PropTypes from 'prop-types';
import { Form, Table } from 'semantic-ui-react';
import { Field } from 'redux-form';
import Input from '../../components/Input';
// import * as validator from '../../utils/validator';

// const validate = (values) => {
//   const errors = {};
//   errors.firstName = validator.required(values.firstName);
//   errors.lastName = validator.required(values.lastName);
//   errors.email = validator.email(values.email);
//   return errors;
// };

// const EditGeneralProfileForm = ({ handleSubmit }) => (
//   <Form onSubmit={handleSubmit}>
//     <Form.Group widths="equal">
//       <Field name="firstName" component={Input} as={Form.Input} label="First name" placeholder="First name" />
//       <Field name="lastName" component={Input} as={Form.Input} label="Last name" placeholder="Last name" />
//     </Form.Group>
//     <Form.Group widths="equal">
//       <Field name="firstNameTh" component={Input} as={Form.Input} label="ชื่อ" placeholder="ชื่อ" />
//       <Field name="lastNameTh" component={Input} as={Form.Input} label="นามสกุล" placeholder="นามสกุล" />
//     </Form.Group>
//     <Field name="nickName" component={Input} as={Form.Input} label="Nick name" placeholder="Nick name" />
//     <Field name="birthday" component={Input} as={Form.Input} type="date" label="Birth date" placeholder="Birth date" />
//     <Field name="citizenId" component={Input} as={Form.Input} label="Citizen ID" placeholder="Citizen ID" />
//     <Field name="mobileNumber" component={Input} as={Form.Input} label="Mobile No." placeholder="Mobile No." />
//     <Field name="email" component={Input} as={Form.Input} label="Email" placeholder="Email" />
//     <Field name="facebookId" component={Input} as={Form.Input} label="Facebook" placeholder="Facebook" />
//     <Field name="lineId" component={Input} as={Form.Input} label="Line ID" placeholder="Line ID" />
//     <Field name="address" component={Input} as={Form.Input} label="Address" placeholder="Address" />
//   </Form>
// );

// EditGeneralProfileForm.propTypes = {
//   handleSubmit: PropTypes.func.isRequired
// };

const row = (item, { checkStatus }) => (
  <Table.Row key={item.citizenId}>
    {checkStatus[item.citizenId] && <Table.Cell>{`${item.firstName} ${item.lastName}`}</Table.Cell>}
    {checkStatus[item.citizenId] && <Table.Cell>{checkStatus[item.citizenId]}</Table.Cell>}
  </Table.Row>
);

const EditRecruitmentForm = ({ data, checkStatus, handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Table>
      <Form.Group widths="equal">
        <Field name="firstName" component={Input} as={Form.Input} label="First name" placeholder="First name" />
        <Field name="lastName" component={Input} as={Form.Input} label="Last name" placeholder="Last name" />
      </Form.Group>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell >Name</Table.HeaderCell>
          <Table.HeaderCell >Status</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(item => row(item, { checkStatus }))}
      </Table.Body>
    </Table>
  </Form>

);

EditRecruitmentForm.propTypes = {
  data: PropTypes.array.isRequired,
  checkStatus: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

// const mapStateToProps = state => ({
//   initialValues: {
//     // userId: state.profile.general.userId,
//     // firstName: state.profile.general.firstName,
//   }
// });

// const enhance = compose(
//   connect(mapStateToProps),
//   reduxForm({
//     form: 'editRecruitment'
//   })
// );

export default (EditRecruitmentForm);
