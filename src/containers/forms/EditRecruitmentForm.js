import React from 'react';
import PropTypes from 'prop-types';
import { Form, Table, input } from 'semantic-ui-react';

const row = (item, { checkStatus, date, time }) => (
  <Table.Row>
    {checkStatus[item.citizenId] && <Table.Cell>{`${item.firstName} ${item.lastName}`}</Table.Cell>}
    {checkStatus[item.citizenId] && <Table.Cell>{checkStatus[item.citizenId]}</Table.Cell>}
    {(checkStatus[item.citizenId] === 'Reject' || checkStatus[item.citizenId] === 'Fail' || checkStatus[item.citizenId] === 'Cancel') && <Table.Cell><input /></Table.Cell>}
    {(checkStatus[item.citizenId] === 'Approve' || checkStatus[item.citizenId] === 'Sign Contract') && <Table.Cell>Date : {date},Time: {time}</Table.Cell>}
  </Table.Row>
);

const EditRecruitmentForm = ({ data, checkStatus, date, time }) => (
  <Form>
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell >Name</Table.HeaderCell>
          <Table.HeaderCell >Status</Table.HeaderCell>
          <Table.HeaderCell >Note</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      {data.map(item => row(item, { checkStatus, date, time }))}
    </Table>
  </Form>

);

EditRecruitmentForm.propTypes = {
  data: PropTypes.array.isRequired,
  checkStatus: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default EditRecruitmentForm;
