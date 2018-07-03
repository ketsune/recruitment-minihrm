import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchRecruitmentSuccess,
  fetchRecruitmentFailure,
  createRecruitmentSuccess,
  createRecruitmentFailure,
  updateRecruitmentInterviewDateTimeFailure,
  updateRecruitmentInterviewDateTimeSuccess,
  updateRecruitmentSignDateTimeFailure,
  updateRecruitmentSignDateTimeSuccess,
} from '../actions/recruitment';
import api from '../services/api';

export function* fetchRecruitmentTask() {
  try {
    const recruitments = yield call(api.fetchRecruitment);
    yield put(fetchRecruitmentSuccess(recruitments));
  }
  catch (error) {
    yield put(fetchRecruitmentFailure(error));
  }
}

export function* createRecruitmentTask(action) {
  try {
    const recruitments = yield call(api.changeRecruitmentStatus, {
      applicant: action.payload.form
    });
    yield put(createRecruitmentSuccess(recruitments));
  }
  catch (error) {
    yield put(createRecruitmentFailure(error));
  }
}

export function* updateRecruitmentInterviewDateTimeTask(action) {
  try {
    const recruitments = yield call(api.updateRecruitmentInterviewDateTime, {
      applicant: action.payload.datetime
    });
    yield put(updateRecruitmentInterviewDateTimeSuccess(recruitments));
  }
  catch (error) {
    yield put(updateRecruitmentInterviewDateTimeFailure(error));
  }
}

export function* updateRecruitmentSignDateTimeTask(action) {
  try {
    console.log('Inside Request Sagas');
    console.log(action.payload.datetime);
    const recruitments = yield call(api.updateRecruitmentSignDateTime, {
      applicant: action.payload.datetime
    });
    console.log(recruitments);
    yield put(updateRecruitmentSignDateTimeSuccess(recruitments));
  }
  catch (error) {
    yield put(updateRecruitmentSignDateTimeFailure(error));
  }
}

export function* watchFetchRecruitmentRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_FETCH_REQUEST, fetchRecruitmentTask);
}

export function* watchCreateRecruitmentRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_CREATE_REQUEST, createRecruitmentTask);
}

export function* watchUpdateRecruitmentInterviewDateTimeRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_UPDATE_INTERVIEW_DATETIME_REQUEST, updateRecruitmentInterviewDateTimeTask);
}

export function* watchUpdateRecruitmentSignDateTimeRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_UPDATE_SIGN_DATETIME_REQUEST, updateRecruitmentSignDateTimeTask);
}

export default function* profileSaga() {
  yield all([
    watchFetchRecruitmentRequest(),
    watchCreateRecruitmentRequest(),
    watchUpdateRecruitmentInterviewDateTimeRequest(),
    watchUpdateRecruitmentSignDateTimeRequest()
  ]);
}
