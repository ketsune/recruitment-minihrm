import { all } from 'redux-saga/effects';
import authSaga from './auth';
import applicantSaga from './applicant';
import profileSaga from './profile';
import masterTableSaga from './masterTable';
import employeeSaga from './employee';
import projectSaga from './project';
import projectDetailSaga from './projectDetail';
import leaveSaga from './leave';
import timesheetSaga from './timesheet';
import recruitmentSaga from './recruitment';
import recruitmentProfileSaga from './recruitmentProfile';

export default function* rootSaga() {
  yield all([
    authSaga(),
    applicantSaga(),
    profileSaga(),
    masterTableSaga(),
    employeeSaga(),
    projectSaga(),
    projectDetailSaga(),
    leaveSaga(),
    timesheetSaga(),
    recruitmentSaga(),
    recruitmentProfileSaga()
  ]);
}
