import * as actionTypes from '../constants/actionTypes';

const initialState = {
  isFetching: true,
  data: [],
  activeItem: 'All',
  searchText: '',
  direction: 'ascending',
  sortKey: 'status',
  checkStatus: {},
  date: '',
  time: '',
  positions: [],
  signedPosition: {},
};

const Recruitment = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RECRUITMENT_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case actionTypes.RECRUITMENT_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload.data,
      };
    case actionTypes.RECRUITMENT_FETCH_FAILURE:
      return {
        ...state,
        isFetching: true,
        messege: action.payload.messege,
      };
    case actionTypes.RECRUITMENT_FETCH_POSITION_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case actionTypes.RECRUITMENT_FETCH_POSITION_SUCCESS:
      return {
        ...state,
        isFetching: false,
        positions: action.payload.data.map(position => position.name),
      };
    case actionTypes.RECRUITMENT_FETCH_POSITION_FAILURE:
      return {
        ...state,
        isFetching: true,
        messege: action.payload.messege,
      };
    case actionTypes.RECRUITMENT_CHANGE_ACTIVE_ITEM:
      return {
        ...state,
        activeItem: action.payload.activeItem,
        checkStatus: {},
        date: '',
        time: '',
        searchText: '',
      };
    case actionTypes.FILTER_RECRUITMENT:
      return {
        ...state,
        searchText: action.payload.searchText
      };
    case actionTypes.SORT_RECRUITMENT:
      return {
        ...state,
        sortKey: action.payload.sortKey,
        direction: action.payload.direction
      };
    case actionTypes.CHECK_RECRUITMENT_STATUS:
      return {
        ...state,
      };

    case actionTypes.CHANGE_RECRUITMENT_STATUS:
      if (action.payload.status === state.checkStatus[action.payload.key]) {
        return {
          ...state,
          checkStatus: {
            ...state.checkStatus,
            [action.payload.key]: '',
          }
        };
      }
      return {
        ...state,
        checkStatus: {
          ...state.checkStatus,
          [action.payload.key]: action.payload.status,
        }
      };
    case actionTypes.RECRUITMENT_SET_SELECT_POSITION:
      return {
        ...state,
        signedPosition: {
          ...state.signedPosition,
          [action.payload.key]: action.payload.value,
        }
      };
    case actionTypes.CLEAR_CHECKSTATUS:
      return {
        ...state,
        checkStatus: {},
      };
    case actionTypes.CLEAR_POSITION:
      return {
        ...state,
        position: {},
        signedPosition: {},
      };
    case actionTypes.CLEAR_DATETIME:
      return {
        ...state,
        date: '',
        time: '',
      };
    case actionTypes.RECRUITMENT_CREATE_REQUEST:
      return {
        ...state,
        form: action.payload.form
      };
    case actionTypes.RECRUITMENT_CREATE_SUCCESS:
      return {
        ...state,
        data: action.payload.data
      };
    case actionTypes.RECRUITMENT_CREATE_FAILURE:
      return {
        ...state,
        message: action.payload.message
      };
    case actionTypes.RECRUITMENT_UPDATE_INTERVIEW_DATETIME_REQUEST:
    case actionTypes.RECRUITMENT_UPDATE_EXAM_DATETIME_REQUEST:
    case actionTypes.RECRUITMENT_UPDATE_SIGN_DATETIME_REQUEST:
    case actionTypes.RECRUITMENT_UPDATE_COMPLETE_DATETIME_REQUEST:
    case actionTypes.RECRUITMENT_UPDATE_REJECT_DATE_REQUEST:
    case actionTypes.RECRUITMENT_UPDATE_CANCEL_DATE_REQUEST:
    case actionTypes.RECRUITMENT_UPDATE_BLACKLIST_DATE_REQUEST:
      return {
        ...state,
      };
    case actionTypes.RECRUITMENT_UPDATE_INTERVIEW_DATETIME_SUCCESS:
    case actionTypes.RECRUITMENT_UPDATE_EXAM_DATETIME_SUCCESS:
    case actionTypes.RECRUITMENT_UPDATE_SIGN_DATETIME_SUCCESS:
    case actionTypes.RECRUITMENT_UPDATE_COMPLETE_DATETIME_SUCCESS:
    case actionTypes.RECRUITMENT_UPDATE_REJECT_DATE_SUCCESS:
    case actionTypes.RECRUITMENT_UPDATE_CANCEL_DATE_SUCCESS:
    case actionTypes.RECRUITMENT_UPDATE_BLACKLIST_DATE_SUCCESS:
      return {
        ...state,
        data: action.payload.data
      };
    case actionTypes.RECRUITMENT_UPDATE_INTERVIEW_DATETIME_FAILURE:
    case actionTypes.RECRUITMENT_UPDATE_EXAM_DATETIME_FAILURE:
    case actionTypes.RECRUITMENT_UPDATE_SIGN_DATETIME_FAILURE:
    case actionTypes.RECRUITMENT_UPDATE_COMPLETE_DATETIME_FAILURE:
    case actionTypes.RECRUITMENT_UPDATE_REJECT_DATE_FAILURE:
    case actionTypes.RECRUITMENT_UPDATE_CANCEL_DATE_FAILURE:
    case actionTypes.RECRUITMENT_UPDATE_BLACKLIST_DATE_FAILURE:
      return {
        ...state,
        message: action.payload.message
      };
    case actionTypes.RECRUITMENT_UPDATE_NOTE_REQUEST:
      return {
        ...state,
        note: action.payload.values
      };
    case actionTypes.RECRUITMENT_UPDATE_NOTE_SUCCESS:
      return {
        ...state,
        data: action.payload.data
      };
    case actionTypes.RECRUITMENT_UPDATE_NOTE_FAILURE:
      return {
        ...state,
        message: action.payload.message
      };
    case actionTypes.RECRUITMENT_UPDATE_INTERVIEW_RESULT_REQUEST:
      return {
        ...state,
        note: action.payload.values
      };
    case actionTypes.RECRUITMENT_UPDATE_INTERVIEW_RESULT_SUCCESS:
      return {
        ...state,
        data: action.payload.data
      };
    case actionTypes.RECRUITMENT_UPDATE_INTERVIEW_RESULT_FAILURE:
      return {
        ...state,
        message: action.payload.message
      };
    case actionTypes.RECRUITMENT_SETDATE:
      return {
        ...state,
        date: action.payload.value
      };
    case actionTypes.RECRUITMENT_SETTIME:
      return {
        ...state,
        time: action.payload.value
      };
    case actionTypes.RECRUITMENT_UPDATE_SIGNED_POSITION_REQUEST:
      return {
        ...state,
        position: action.payload.form
      };
    case actionTypes.RECRUITMENT_UPDATE_SIGNED_POSITION_SUCCESS:
      return {
        ...state,
        data: action.payload.data
      };
    case actionTypes.RECRUITMENT_UPDATE_SIGNED_POSITION_FAILURE:
      return {
        ...state,
        message: action.payload.message
      };
    default:
      return state;
  }
};

export default Recruitment;
