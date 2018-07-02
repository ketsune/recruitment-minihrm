import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';
import { isSubmitting } from 'redux-form';
import { closeModal } from '../../actions/modal';
import Modal from '../../components/Modal';
// import EditRecruitmentForm from '../forms/EditRecruitmentForm';
// import { handleReduxFormSubmit } from '../../utils/helper';
import { createRecruitmentRequest } from '../../actions/recruitment';

const row = (item, { checkStatus }) => (
  <Table.Row key={item.citizenId}>
    {checkStatus[item.citizenId] && <Table.Cell>{`${item.firstName} ${item.lastName}`}</Table.Cell>}
    {checkStatus[item.citizenId] && <Table.Cell>{checkStatus[item.citizenId]}</Table.Cell>}
  </Table.Row>
);

const EditRecruitmentModal = ({ onClick, submitting, onClose, data, checkStatus }) => (
  <Modal
    header="Edit Recruitment"
    onClose={onClose}
    onClick={onClick}
    submitting={submitting}
    checkStatus={checkStatus}
  >
    <Table>
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
    {/* <EditRecruitmentForm data={data} checkStatus={checkStatus} onConfirm={values => onConfirm(values)} /> */}
  </Modal>
);

EditRecruitmentModal.propTypes = {
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  // onSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  // onConfirm: PropTypes.func.isRequired,
  checkStatus: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  submitting: isSubmitting('editRecruitment')(state),
  data: state.recruitment.data,
  checkStatus: state.recruitment.checkStatus,
});

// createProjectRequest->createRecruitmentRequest แล้วสร้างด้วย เขียนไว้กันลืมแก้อะนะ
const mapDispatchToProps = dispatch => ({
  onClick: (checkStatus) => {
    console.log('On Click');
    console.log(checkStatus);
    Object.keys(checkStatus).map((key) => {
      const form = {
        citizenId: key,
        status: checkStatus[key],
      };
      console.log(form);
      dispatch(createRecruitmentRequest(form));
      dispatch(closeModal());
      return '';
    });
  },
  onClose: () => dispatch(closeModal()),
  // onConfirm: (values) => {
  //   console.log(values);
  //   handleReduxFormSubmit(dispatch, createRecruitmentRequest, values, 'editRecruitment');
  // },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditRecruitmentModal);
