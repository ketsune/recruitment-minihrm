import * as actionTypes from '../constants/actionTypes';

const initialState = {
  isFetching: true,
  lists: []
};

const applicant = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APPLICANT_FETCH_REQUEST:
      return {
        isFetching: true
      };
    case actionTypes.APPLICANT_FETCH_SUCCESS:
      return {
        isFetching: false,
        lists: action.payload.applicants
      };
    case actionTypes.APPLICANT_FETCH_FAILURE:
      return {
        ...state,
        isFetching: false,
        message: action.payload.message
      };
    default:
      return state;
  }
};

export default applicant;
