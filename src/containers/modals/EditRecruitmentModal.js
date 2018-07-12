import React from 'react';
import PropTypes from 'prop-types';
import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { Modal as SUIModal, Button } from 'semantic-ui-react';
import { isSubmitting } from 'redux-form';
import { closeModal } from '../../actions/modal';
import EditRecruitmentForm from '../forms/EditRecruitmentForm';
// import { handleReduxFormSubmit } from '../../utils/helper';
import {
  createRecruitmentRequest, updateRecruitmentInterviewDateTimeRequest,
  updateRecruitmentSignDateTimeRequest, updateRecruitmentCompleteDateTimeRequest,
  updateRecruitmentRejectDateRequest, updateRecruitmentCancelDateRequest,
  updateRecruitmentBlacklistDateRequest, updateRecruitmentNoteRequest,
  updateRecruitmentExamDateTimeRequest, updateRecruitmentSignedPositionRequest, clearStatus, clearDateTime, clearPosition
} from '../../actions/recruitment';

const EditRecruitmentModal = ({ onClick, onClose, submitting, data, checkStatus, date, time, buttons, confirm, note, signedPosition, updateSignedPosition, resetOnClose }) => (
  <SUIModal
    dimmer="blurring"
    size="small"
    closeIcon
    open
    onClose={resetOnClose}
  >
    <SUIModal.Header>
      Edit Recruitment
    </SUIModal.Header>
    <SUIModal.Content>
      <EditRecruitmentForm data={data} checkStatus={checkStatus} date={date} time={time} />
    </SUIModal.Content>
    <SUIModal.Actions>
      {buttons.map(B => B)}
      <Button color="blue" loading={submitting} disabled={submitting} onClick={() => { onClick(checkStatus, date, time, note); if (Object.keys(signedPosition).length > 0) updateSignedPosition(signedPosition); onClose(); }}>Save</Button>
      {confirm && <Button loading={submitting} disabled={submitting} onClick={onClose}>No</Button>}
    </SUIModal.Actions>
  </SUIModal>
);

EditRecruitmentModal.defaultProps = {
  confirm: false,
  buttons: [],
  note: '',
};

EditRecruitmentModal.propTypes = {
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  updateSignedPosition: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
  confirm: PropTypes.bool,
  buttons: PropTypes.array,
  // onConfirm: PropTypes.func.isRequired,
  checkStatus: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  note: PropTypes.object,
  signedPosition: PropTypes.object.isRequired,
  resetOnClose: PropTypes.func.isRequired,
  // onSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  modalName: state.modal.name,
  submitting: isSubmitting('editRecruitment')(state),
  data: state.recruitment.data,
  checkStatus: state.recruitment.checkStatus,
  date: state.recruitment.date,
  time: state.recruitment.time,
  note: state.form,
  signedPosition: state.recruitment.signedPosition,
});

const mapDispatchToProps = dispatch => ({
  // function สำหรับการเปลี่ยนสเตตัส อาจจะเพิ่มการเช็คเงื่อนไขการเปลี่ยนสถานะเพื่อความถูกต้อง
  onClick: (checkStatus, date, time, note) => {
    Object.keys(checkStatus)
      .filter(status => checkStatus[status] !== '')
      .forEach((key) => {
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
            dispatch(updateRecruitmentExamDateTimeRequest(dateTime));
            break;
          case 'Exam':
            dispatch(updateRecruitmentExamDateTimeRequest(dateTime));
            return '';
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
        dispatch(createRecruitmentRequest(form));
        return true;
      });
    // Clear state for protecting wrong work flow
    dispatch(clearStatus());
    dispatch(clearDateTime());
  },
  onClose: () => {
    dispatch(closeModal());
  },
  // update position that applicant pass
  updateSignedPosition: (signedPosition) => {
    Object.keys(signedPosition).forEach((key) => {
      const form = {
        citizenId: key,
        signedPosition: signedPosition[key],
      };
      dispatch(updateRecruitmentSignedPositionRequest(form));
      return '';
    });
    dispatch(clearPosition());
  },
  // Function to reset value to prevent wrong work flow
  resetOnClose: () => {
    dispatch(clearDateTime());
    dispatch(clearPosition());
    dispatch(clearStatus());
    dispatch(closeModal());
  }
  // onSubmit: values => dispatch(updateRecruitmentNoteRequest(values)),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      const { date, time, onClose, checkStatus } = this.props;
      // Check that date time is empty or not (validation)
      let applicantsStatus = Object.keys(checkStatus)
        .filter(key => checkStatus[key] === 'Complete' || checkStatus[key] === 'Approve'
          || checkStatus[key] === 'Sign Contract' || checkStatus[key] === 'Exam');
      if (applicantsStatus.length > 0) {
        // Complete doesn't use time so filter non complete out
        applicantsStatus = Object.keys(checkStatus).filter(key => checkStatus[key] === 'Complete');
        if ((date === '' || time === '') && applicantsStatus.length === 0) {
          alert('Date or Time is EMPTY!, Please fill it.'); // eslint-disable-line no-alert
          onClose();
        }
        else if (applicantsStatus.length > 0 && date === '') {
          alert('Date is EMPTY!, Please fill it.'); // eslint-disable-line no-alert
          onClose();
        }
      }
      // Check that user is select status or not when user press confirm button
      if (checkStatus.length !== 0) {
        const notEmptyStatus = Object.keys(checkStatus).filter(key => checkStatus[key] !== '');
        if (notEmptyStatus.length === 0) {
          alert('You did\'t choose any status!!!'); // eslint-disable-line no-alert
          onClose();
        }
      }
    }
  })
);

export default enhance(EditRecruitmentModal);
