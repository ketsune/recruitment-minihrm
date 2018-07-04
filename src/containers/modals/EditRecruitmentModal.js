import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Table } from 'semantic-ui-react';
import { isSubmitting } from 'redux-form';
import { closeModal } from '../../actions/modal';
import Modal from '../../components/Modal';
import EditRecruitmentForm from '../forms/EditRecruitmentForm';
// import { handleReduxFormSubmit } from '../../utils/helper';
import {
  createRecruitmentRequest, updateRecruitmentInterviewDateTimeRequest,
  updateRecruitmentSignDateTimeRequest, updateRecruitmentCompleteDateTimeRequest,
  updateRecruitmentRejectDateRequest, updateRecruitmentCancelDateRequest,
  updateRecruitmentBlacklistDateRequest, updateRecruitmentNoteRequest
} from '../../actions/recruitment';
import { getRecruitmentByCitizen } from '../../selectors/recruitment';

// const EditRecruitmentModal = ({ onClick, onClose, submitting, data, onConfirm, checkStatus, date, time }) => (
const EditRecruitmentModal = ({ onClick, onClose, submitting, data, checkStatus, date, time }) => (
  <Modal
    header="Edit Recruitment"
    onClose={onClose}
    onClick={onClick}
    submitting={submitting}
    checkStatus={checkStatus}
    date={date}
    time={time}
    data={data}
  >
    {/* <EditRecruitmentForm data={data} onConfirm={values => onConfirm(values)} checkStatus={checkStatus} date={date} time={time} /> */}
    <EditRecruitmentForm data={data} checkStatus={checkStatus} date={date} time={time} />
  </Modal>
);

EditRecruitmentModal.propTypes = {
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  // onConfirm: PropTypes.func.isRequired,
  checkStatus: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  // onSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  submitting: isSubmitting('editRecruitment')(state),
  data: state.recruitment.data,
  checkStatus: state.recruitment.checkStatus,
  date: state.recruitment.date,
  time: state.recruitment.time,
});

const mapDispatchToProps = dispatch => ({
  // function สำหรับการเปลี่ยนสเตตัส อาจจะเพิ่มการเช็คเงื่อนไขการเปลี่ยนสถานะเพื่อความถูกต้อง
  onClick: (checkStatus, date, time, data, note) => {
    Object.keys(checkStatus).map((key) => {
      // UPDATE DATETIME => apply-->approve pass-->sign ?-->cancel ?-->blacklist
      const datetime = {
        citizenId: key,
        date,
        time
      };
      if (date !== '' || time !== '') {
        const target = getRecruitmentByCitizen(data, key);
        switch (checkStatus[key]) {
          case 'Approve':
            // Fill in blank date or time for editting only one field
            if (date === '') {
              datetime.date = target.interviewDate;
            }
            else if (time === '') {
              datetime.time = target.interviewTime;
            }
            dispatch(updateRecruitmentInterviewDateTimeRequest(datetime));
            break;
          case 'Sign Contract':
            if (date === '') {
              datetime.date = target.signDate;
            }
            else if (time === '') {
              datetime.time = target.signTime;
            }
            dispatch(updateRecruitmentSignDateTimeRequest(datetime));
            break;
          case 'Complete':
            delete datetime.time;
            dispatch(updateRecruitmentCompleteDateTimeRequest(datetime));
            break;
          default:
            break;
        }
      }
      else if (checkStatus[key] !== 'Pass') {
        // Get Note
        const addNote = note.editRecruitment.values;
        addNote.citizenId = key;
        // Get Now DATE
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;// January is 0!
        const yyyy = today.getFullYear();
        if (dd < 10) {
          dd = '0'.concat(dd);
        }
        if (mm < 10) {
          mm = '0'.concat(mm);
        }
        today = `${yyyy}-${mm}-${dd}`;
        switch (checkStatus[key]) {
          case 'Reject':
          case 'Fail':
            delete datetime.time;
            datetime.date = today;
            dispatch(updateRecruitmentNoteRequest(addNote));
            dispatch(updateRecruitmentRejectDateRequest(datetime));
            break;
          case 'Cancel':
            delete datetime.time;
            datetime.date = today;
            dispatch(updateRecruitmentNoteRequest(addNote));
            dispatch(updateRecruitmentCancelDateRequest(datetime));
            break;
          case 'Blacklist':
            delete datetime.time;
            datetime.date = today;
            dispatch(updateRecruitmentNoteRequest(addNote));
            dispatch(updateRecruitmentBlacklistDateRequest(datetime));
            break;
          default:
            break;
        }
      }
      // CHANGE STATUS
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
  // onSubmit: values => dispatch(updateRecruitmentNoteRequest(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditRecruitmentModal);
