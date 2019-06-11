import {
  RECEIVE_USER,
} from '../actions/user';

const initialState = {
  isFetching: false,
  isError: false,
  item: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_USER:
      return {
        ...state,
        item: action.payload || initialState.item,
      };
    default:
      return state;
  }
};
