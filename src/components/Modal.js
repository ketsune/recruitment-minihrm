import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal as SUIModal, Button } from 'semantic-ui-react';

const Modal = ({ header, buttonName, onClose, onClick, submitting, children, confirm, buttons, checkStatus, date, time, data, note }) => (
  <SUIModal
    dimmer="blurring"
    size="small"
    closeIcon
    open
    onClose={onClose}
  >
    <SUIModal.Header>
      {header}
    </SUIModal.Header>
    <SUIModal.Content>
      {children}
    </SUIModal.Content>
    <SUIModal.Actions>
      {buttons.map(B => B)}
      <Button color="blue" loading={submitting} disabled={submitting} onClick={() => onClick(checkStatus, date, time, data, note)}>{buttonName}</Button>
      {confirm && <Button loading={submitting} disabled={submitting} onClick={onClose}>No</Button>}
    </SUIModal.Actions>
  </SUIModal>
);

Modal.defaultProps = {
  buttonName: 'Save',
  confirm: false,
  buttons: [],
  checkStatus: {},
  date: '',
  time: '',
  data: [],
  note: '',
};

Modal.propTypes = {
  header: PropTypes.string.isRequired,
  buttonName: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  data: PropTypes.array,
  confirm: PropTypes.bool,
  buttons: PropTypes.array,
  checkStatus: PropTypes.object,
  date: PropTypes.string,
  time: PropTypes.string,
  note: PropTypes.object,
};

const mapStateToProps = state => ({
  note: state.form,
});

export default connect(mapStateToProps)(Modal);
