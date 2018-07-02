import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchRecruitmentSuccess,
  fetchRecruitmentFailure,
  createRecruitmentSuccess,
  createRecruitmentFailure,
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
  // try {
  //   yield call(api.createEmployee, {
  //     user: action.payload.form
  //   });
  //   yield put(createEmployeeSuccess());
  // }
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

export function* watchFetchRecruitmentRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_FETCH_REQUEST, fetchRecruitmentTask);
}

export function* watchCreateRecruitmentRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_CREATE_REQUEST, createRecruitmentTask);
}

export default function* profileSaga() {
  yield all([
    watchFetchRecruitmentRequest(),
    watchCreateRecruitmentRequest()
  ]);
}
