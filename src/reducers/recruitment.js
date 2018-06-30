import * as actionTypes from '../constants/actionTypes';

const initialState = {
  isFetching: true,
  data: [],
  activeItem: 'All',
  searchText: '',
  direction: '',
  sortKey: '',
  checkStatus: [],
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
    case actionTypes.RECRUITMENT_CHANGE_ACTIVE_ITEM:
      return {
        ...state,
        activeItem: action.payload.activeItem,
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
        }
      } else {
        return {
          ...state,
          checkStatus: {
            ...state.checkStatus,
            [action.payload.key]: action.payload.status,
          }
        }

      };
    case actionTypes.CLEAR_CHECKSTATUS:
      return {
        ...state,
        checkStatus: [],
      };
    case actionTypes.RECRUITMENT_CREATE_REQUEST:
      return {
        ...state,
        form: action.payload.form
      };
    default:
      return state;
  }
};

export default Recruitment;
