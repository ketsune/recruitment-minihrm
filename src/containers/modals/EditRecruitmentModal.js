import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Table } from 'semantic-ui-react';
import { isSubmitting } from 'redux-form';
import { closeModal } from '../../actions/modal';
import Modal from '../../components/Modal';
import EditRecruitmentForm from '../forms/EditRecruitmentForm';
// import { handleReduxFormSubmit } from '../../utils/helper';
import { createRecruitmentRequest, updateRecruitmentInterviewDateTimeRequest, updateRecruitmentSignDateTimeRequest } from '../../actions/recruitment';
import { getRecruitmentByCitizen } from '../../selectors/recruitment';

// const row = (item, { checkStatus }) => (
//   <Table.Row key={item.citizenId}>
//     {checkStatus[item.citizenId] && <Table.Cell>{`${item.firstName} ${item.lastName}`}</Table.Cell>}
//     {checkStatus[item.citizenId] && <Table.Cell>{checkStatus[item.citizenId]}</Table.Cell>}
//   </Table.Row>
// );

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
    {/* <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell >Name</Table.HeaderCell>
          <Table.HeaderCell >Status</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(item => row(item, { checkStatus }))}
      </Table.Body>
    </Table> */}
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
  onClick: (checkStatus, date, time, data) => {
    Object.keys(checkStatus).map((key) => {
      // UPDATE DATETIME => apply-->approve pass-->sign ?-->cancel ?-->blacklist
      if (date !== '' || time !== '') {
        const datetime = {
          citizenId: key,
          date,
          time
        };
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
          default:
            return '';
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
  // onConfirm: (values) => {
  //   console.log(values);
  //   handleReduxFormSubmit(dispatch, createRecruitmentRequest, values, 'editRecruitment');
  // },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditRecruitmentModal);
