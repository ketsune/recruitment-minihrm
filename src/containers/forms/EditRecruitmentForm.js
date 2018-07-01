import React from 'react';
import PropTypes from 'prop-types';
import { Form, Table } from 'semantic-ui-react';

const row = (item, { checkStatus }) => (
  <Table.Row>
    {checkStatus[item.citizenId] && <Table.Cell>{`${item.firstName} ${item.lastName}`}</Table.Cell>}
    {checkStatus[item.citizenId] && <Table.Cell>{checkStatus[item.citizenId]}</Table.Cell>}
  </Table.Row>
);

const EditRecruitmentForm = ({ data, checkStatus }) => (
  <Form>
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell >Name</Table.HeaderCell>
          <Table.HeaderCell >Status</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      {data.map(item => row(item, { checkStatus }))}
    </Table>
  </Form>

);

EditRecruitmentForm.propTypes = {
  data: PropTypes.array.isRequired,
  checkStatus: PropTypes.object.isRequired,
};

export default EditRecruitmentForm;
