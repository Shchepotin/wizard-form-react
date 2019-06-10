import {
  RECEIVE_USER_LIST,
} from '../actions/userList';

const initialState = {
  isFetching: false,
  isError: false,
  items: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_USER_LIST:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};
