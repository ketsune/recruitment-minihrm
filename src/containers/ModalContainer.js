import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as modalNames from '../constants/modalNames';
import EditGeneralProfileModal from './modals/EditGeneralProfileModal';
import EditWorkProfileModal from './modals/EditWorkProfileModal';
import EditEducationProfileModal from './modals/EditEducationProfileModal';
import AddEmployeeModal from './modals/AddEmployeeModal';
import AddEducationProfileModal from './modals/AddEducationProfileModal';
import AddCertificateProfileModal from './modals/AddCertificateProfileModal';
import AddAssetProfileModal from './modals/AddAssetProfileModal';
import AddProjectModal from './modals/AddProjectModal';
import CreateLeaveRequestModal from './modals/CreateLeaveRequestModal';
import ConfirmModal from './modals/ConfirmModal';
import ProfilePictureModal from './modals/ProfilePictureModal';

const ModalContainer = ({ name, props }) => {
  switch (name) {
    case modalNames.EDIT_GENERAL_PROFILE:
      return <EditGeneralProfileModal {...props} />;
    case modalNames.EDIT_WORK_PROFILE:
      return <EditWorkProfileModal {...props} />;
    case modalNames.EDIT_EDUCATION_PROFILE:
      return <EditEducationProfileModal {...props} />;
    case modalNames.ADD_EDUCATION_PROFILE:
      return <AddEducationProfileModal {...props} />;
    case modalNames.ADD_CERTIFICATE_PROFILE:
      return <AddCertificateProfileModal />;
    case modalNames.ADD_ASSET_PROFILE:
      return <AddAssetProfileModal />;
    case modalNames.ADD_EMPLOYEE:
      return <AddEmployeeModal {...props} />;
    case modalNames.ADD_PROJECT:
      return <AddProjectModal {...props} />;
    case modalNames.CREATE_LEAVE_REQUEST:
      return <CreateLeaveRequestModal {...props} />;
    case modalNames.CONFIRM:
      return <ConfirmModal {...props} />;
    case modalNames.PROFILE_PICTURE:
      return <ProfilePictureModal {...props} />;
    default:
      return <div />;
  }
};

ModalContainer.defaultProps = {
  name: null,
  props: null
};

ModalContainer.propTypes = {
  name: PropTypes.string,
  props: PropTypes.object
};

const mapStateToProps = state => ({
  name: state.modal.name,
  props: state.modal.props
});

export default connect(mapStateToProps)(ModalContainer);
