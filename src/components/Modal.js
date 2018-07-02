import React from 'react';
import PropTypes from 'prop-types';
import { Modal as SUIModal, Button } from 'semantic-ui-react';

const Modal = ({ header, buttonName, onClose, onClick, submitting, children, confirm, buttons, checkStatus }) => (
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
      <Button color="blue" loading={submitting} disabled={submitting} onClick={() => onClick(checkStatus)}>{buttonName}</Button>
      {confirm && <Button loading={submitting} disabled={submitting} onClick={onClose}>No</Button>}
    </SUIModal.Actions>
  </SUIModal>
);

Modal.defaultProps = {
  buttonName: 'Save',
  confirm: false,
  buttons: [],
  checkStatus: {}
};

Modal.propTypes = {
  header: PropTypes.string.isRequired,
  buttonName: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  confirm: PropTypes.bool,
  buttons: PropTypes.array,
  checkStatus: PropTypes.object,
};

export default Modal;
