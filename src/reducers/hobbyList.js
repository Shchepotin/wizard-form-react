import {
  RECEIVE_HOBBY_LIST,
} from '../actions/hobbyList';

const initialState = {
  isFetching: false,
  isError: false,
  items: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_HOBBY_LIST:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};
