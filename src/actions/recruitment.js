import * as actionTypes from '../constants/actionTypes';

export const fetchRecruitmentRequest = () => ({
  type: actionTypes.RECRUITMENT_FETCH_REQUEST
});

export const fetchRecruitmentSuccess = data => ({
  type: actionTypes.RECRUITMENT_FETCH_SUCCESS,
  payload: {
    data
  }
});

export const fetchRecruitmentFailure = message => ({
  type: actionTypes.RECRUITMENT_FETCH_FAILURE,
  payload: {
    message
  }
});

export const changeActiveItemRequest = activeItem => ({
  type: actionTypes.RECRUITMENT_CHANGE_ACTIVE_ITEM,
  payload: {
    activeItem
  }
});

export const filterRecruitment = text => ({
  type: actionTypes.FILTER_RECRUITMENT,
  payload: {
    searchText: text
  }
});

export const sortRecruitment = (sortKey, direction) => ({
  type: actionTypes.SORT_RECRUITMENT,
  payload: {
    sortKey,
    direction
  }
});

// export const selectStatus = (key, status) => {
//   return (
//     (status === state.recruitment.checkStatus[key])
//   );
// };

export const changeStatus = (key, status) => ({
  type: actionTypes.CHANGE_RECRUITMENT_STATUS,
  payload: {
    key,
    status
  }
});

export const clearStatus = () => ({
  type: actionTypes.CLEAR_CHECKSTATUS,
  payload: {

  }
});

export const createRecruitmentRequest = (form, resolve, reject) => ({
  type: actionTypes.RECRUITMENT_CREATE_REQUEST,
  payload: {
    form,
    resolve,
    reject
  }
});
