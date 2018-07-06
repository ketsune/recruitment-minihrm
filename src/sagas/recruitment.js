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
  updateRecruitmentCompleteDateTimeFailure,
  updateRecruitmentCompleteDateTimeSuccess,
  updateRecruitmentRejectDateFailure,
  updateRecruitmentRejectDateSuccess,
  updateRecruitmentCancelDateFailure,
  updateRecruitmentCancelDateSuccess,
  updateRecruitmentBlacklistDateFailure,
  updateRecruitmentBlacklistDateSuccess,
  updateRecruitmentNoteFailure,
  updateRecruitmentNoteSuccess,
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

export function* updateRecruitmentCompleteDateTimeTask(action) {
  try {
    const recruitments = yield call(api.updateRecruitmentCompleteDateTime, {
      applicant: action.payload.datetime
    });
    console.log(recruitments);
    yield put(updateRecruitmentCompleteDateTimeSuccess(recruitments));
  }
  catch (error) {
    yield put(updateRecruitmentCompleteDateTimeFailure(error));
  }
}

export function* updateRecruitmentRejectDateTask(action) {
  try {
    const recruitments = yield call(api.updateRecruitmentRejectDate, {
      applicant: action.payload.datetime
    });
    console.log(recruitments);
    yield put(updateRecruitmentRejectDateSuccess(recruitments));
  }
  catch (error) {
    yield put(updateRecruitmentRejectDateFailure(error));
  }
}

export function* updateRecruitmentCancelDateTask(action) {
  try {
    const recruitments = yield call(api.updateRecruitmentCancelDate, {
      applicant: action.payload.datetime
    });
    console.log(recruitments);
    yield put(updateRecruitmentCancelDateSuccess(recruitments));
  }
  catch (error) {
    yield put(updateRecruitmentCancelDateFailure(error));
  }
}

export function* updateRecruitmentBlacklistDateTask(action) {
  try {
    const recruitments = yield call(api.updateRecruitmentBlacklistDate, {
      applicant: action.payload.datetime
    });
    console.log(recruitments);
    yield put(updateRecruitmentBlacklistDateSuccess(recruitments));
  }
  catch (error) {
    yield put(updateRecruitmentBlacklistDateFailure(error));
  }
}

export function* updateRecruitmentNoteTask(action) {
  try {
    console.log('Note Saga');
    console.log(action.payload.values);
    const recruitments = yield call(api.updateRecruitmentNote, {
      applicant: action.payload.values
    });
    yield put(updateRecruitmentNoteSuccess(recruitments));
  }
  catch (error) {
    yield put(updateRecruitmentNoteFailure(error));
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

export function* watchUpdateRecruitmentCompleteDateTimeRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_UPDATE_COMPLETE_DATETIME_REQUEST, updateRecruitmentCompleteDateTimeTask);
}

export function* watchUpdateRecruitmentRejectDateRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_UPDATE_REJECT_DATE_REQUEST, updateRecruitmentRejectDateTask);
}

export function* watchUpdateRecruitmentCancelDateRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_UPDATE_CANCEL_DATE_REQUEST, updateRecruitmentCancelDateTask);
}

export function* watchUpdateRecruitmentBlacklistDateRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_UPDATE_BLACKLIST_DATE_REQUEST, updateRecruitmentBlacklistDateTask);
}

export function* watchUpdateRecruitmentNoteRequest() {
  yield takeEvery(actionTypes.RECRUITMENT_UPDATE_NOTE_REQUEST, updateRecruitmentNoteTask);
}

export default function* recruitmentSaga() {
  yield all([
    watchFetchRecruitmentRequest(),
    watchCreateRecruitmentRequest(),
    watchUpdateRecruitmentInterviewDateTimeRequest(),
    watchUpdateRecruitmentSignDateTimeRequest(),
    watchUpdateRecruitmentCompleteDateTimeRequest(),
    watchUpdateRecruitmentRejectDateRequest(),
    watchUpdateRecruitmentCancelDateRequest(),
    watchUpdateRecruitmentBlacklistDateRequest(),
    watchUpdateRecruitmentNoteRequest(),
  ]);
}
