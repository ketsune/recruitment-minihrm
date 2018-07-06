import { call, put, takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../constants/actionTypes';
import {
  fetchRecruitmentProfileSuccess,
  fetchRecruitmentProfileFailure,
} from '../actions/recruitmentProfile';
import api from '../services/api';

export function* fetchRecruitmentProfileTask(action) {
  try {
    console.log(action.payload);
    const recruitments = yield call(api.fetchRecruitmentProfile, action.payload.id);
    yield put(fetchRecruitmentProfileSuccess(recruitments));
  }
  catch (error) {
    yield put(fetchRecruitmentProfileFailure(error));
  }
}

export function* watchFetchRecruitmentProfileRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_PROFILE_FETCH_REQUEST, fetchRecruitmentProfileTask);
}

export default function* recruitmentProfileSaga() {
  yield all([
    watchFetchRecruitmentProfileRequest(),
  ]);
}
