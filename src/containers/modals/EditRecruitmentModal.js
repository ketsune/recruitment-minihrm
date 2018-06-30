import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal';
import { submit, isSubmitting } from 'redux-form';
import Modal from '../../components/Modal';
import EditRecruitmentForm from '../forms/EditRecruitmentForm';
import { handleReduxFormSubmit } from '../../utils/helper';
import { createRecruitmentRequest } from '../../actions/recruitment';


const EditRecruitmentModal = ({ onClick, onClose, submitting, data, onConfirm, checkStatus }) => (
    <Modal
        header="Edit Recruitment"
        onClose={onClose}
        onClick={onClick}
        submitting={submitting}
    >
        <EditRecruitmentForm data={data} onConfirm={values => onConfirm(values)} checkStatus={checkStatus} />
    </Modal>
);

EditRecruitmentModal.propTypes = {
    onClick: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    onConfirm: PropTypes.func.isRequired,
    checkStatus: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    modalName: state.modal.name,
    submitting: isSubmitting('editRecruitment')(state),
    data: state.recruitment.data,
    checkStatus: state.recruitment.checkStatus,
});

const mapDispatchToProps = dispatch => ({
    onClick: () => dispatch(submit('editRecruitment')),
    onClose: () => dispatch(closeModal()),
    onConfirm: values => handleReduxFormSubmit(dispatch, createRecruitmentRequest, values),//createProjectRequest->createRecruitmentRequest แล้วสร้างด้วย เขียนไว้กันลืมแก้อะนะ
});

export default connect(mapStateToProps, mapDispatchToProps)(EditRecruitmentModal);