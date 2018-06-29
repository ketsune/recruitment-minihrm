import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal';
import { submit, isSubmitting } from 'redux-form';
import Modal from '../../components/Modal';
import EditRecruitmentForm from '../forms/EditRecruitmentForm';
import { handleReduxFormSubmit } from '../../utils/helper';


const EditRecruitmentModal = ({ onClick, onClose, submitting, data, onConferm }) => (
    <Modal
        header="Edit Recruitment"
        onClose={onClose}
        onClick={onClick}
        submitting={submitting}
    >
        <EditRecruitmentForm data={data} onConferm={values => onConferm(values)} />
    </Modal>
);

EditRecruitmentModal.propTypes = {
    onClick: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    data: PropTypes.array.isRequired,
    onConferm: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    modalName: state.modal.name,
    submitting: isSubmitting('editRecruitment')(state),
    data: state.recruitment.data,
});

const mapDispatchToProps = dispatch => ({
    onClick: () => dispatch(submit('editRecruitment')),
    onClose: () => dispatch(closeModal()),
    onConferm: values => handleReduxFormSubmit(dispatch, createProjectRequest, values),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditRecruitmentModal);