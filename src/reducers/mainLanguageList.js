import {
  RECEIVE_MAIN_LANGUAGE_LIST,
} from '../actions/mainLanguageList';

const initialState = {
  isFetching: false,
  isError: false,
  items: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_MAIN_LANGUAGE_LIST:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};
