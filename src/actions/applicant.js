import * as actionTypes from '../constants/actionTypes';

export const fetchApplicantRequest = () => ({
  type: actionTypes.APPLICANT_FETCH_REQUEST
});

export const fetchApplicantSuccess = applicants => ({
  type: actionTypes.APPLICANT_FETCH_SUCCESS,
  payload: {
    applicants
  }
});

export const fetchApplicantFailure = message => ({
  type: actionTypes.APPLICANT_FETCH_FAILURE,
  payload: {
    message
  }
});
