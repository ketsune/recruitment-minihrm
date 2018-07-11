import React from 'react';
import PropTypes from 'prop-types';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
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
    Object.keys(checkStatus)
      .filter(status => checkStatus[status] !== '')
      .map((key) => {
        // UPDATE DATETIME => apply-->approve pass-->sign ?-->cancel ?-->blacklist
        const dateTime = {
          citizenId: key,
          date,
          time
        };
        // Get Note
        const addNote = {};
        if (note.editRecruitment !== undefined) {
          const tmp = note.editRecruitment.values;
          const strIndex = `note_${key}`;
          addNote.note = tmp[strIndex];
          addNote.citizenId = key;
        }
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
          case 'Approve':
            dispatch(updateRecruitmentInterviewDateTimeRequest(dateTime));
            break;
          case 'Blacklist':
            delete dateTime.time;
            dateTime.date = today;
            dispatch(updateRecruitmentNoteRequest(addNote));
            dispatch(updateRecruitmentBlacklistDateRequest(dateTime));
            break;
          case 'Cancel':
            delete dateTime.time;
            dateTime.date = today;
            dispatch(updateRecruitmentNoteRequest(addNote));
            dispatch(updateRecruitmentCancelDateRequest(dateTime));
            break;
          case 'Complete':
            delete dateTime.time;
            dispatch(updateRecruitmentCompleteDateTimeRequest(dateTime));
            break;
          // case 'In Progress':
          //   break;
          // case 'Pass':
          //   break;
          case 'Reject':
            delete dateTime.time;
            dateTime.date = today;
            dispatch(updateRecruitmentNoteRequest(addNote));
            dispatch(updateRecruitmentRejectDateRequest(dateTime));
            break;
          case 'Sign Contract':
            dispatch(updateRecruitmentSignDateTimeRequest(dateTime));
            break;
          case 'Fail':
            delete dateTime.time;
            dateTime.date = today;
            dispatch(updateRecruitmentNoteRequest(addNote));
            dispatch(updateRecruitmentRejectDateRequest(dateTime));
            break;
          default:
            break;
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

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      // Check that date time is empty or not (validation)
      const { date, time, onClose, checkStatus } = this.props;
      let tmp = Object.keys(checkStatus)
        .filter(key => checkStatus[key] === 'Complete' || checkStatus[key] === 'Approve'
          || checkStatus[key] === 'Sign Contract');
      if (tmp.length > 0) {
        tmp = Object.keys(checkStatus).filter(key => checkStatus[key] === 'Complete');
        if ((date === '' || time === '') && tmp.length === 0) {
          alert('Date or Time is EMPTY!, Please fill it.'); // eslint-disable-line no-alert
          onClose();
        }
        else if (tmp.length > 0 && date === '') {
          alert('Date is EMPTY!, Please fill it.'); // eslint-disable-line no-alert
          onClose();
        }
      }
    }
  })
);

export default enhance(EditRecruitmentModal);
