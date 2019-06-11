import {
  RECEIVE_SKILL_LIST,
} from '../actions/skillList';

const initialState = {
  isFetching: false,
  isError: false,
  items: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_SKILL_LIST:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};
