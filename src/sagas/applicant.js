import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchApplicantSuccess,
  fetchApplicantFailure,
} from '../actions/applicant';
import api from '../services/api';

export function* fetchApplicantTask() {
  try {
    const applicants = yield call(api.fetchApplicant);
    yield put(fetchApplicantSuccess(applicants));
  }
  catch (error) {
    yield put(fetchApplicantFailure(error));
  }
}

// export function* createApplicantTask(action) {
//   try {
//     yield call(api.createEmployee, {
//       user: action.payload.form
//     });
//     yield put(createEmployeeSuccess());
//   }
//   catch (error) {
//     yield put(createEmployeeFailure(error));
//   }
// }

export function* watchFetchApplicantRequest() {
  yield takeEvery(actionTypes.APPLICANT_FETCH_REQUEST, fetchApplicantTask);
}

// export function* watchCreateEmployeeRequest() {
//   yield takeEvery(actionTypes.EMPLOYEE_CREATE_REQUEST, createEmployeeTask);
// }

export default function* profileSaga() {
  yield all([
    watchFetchApplicantRequest(),
    // watchCreateEmployeeRequest()
  ]);
}
