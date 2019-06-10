import {
  RECEIVE_USER,
} from '../actions/user';

const initialState = {
  isFetching: false,
  isError: false,
  item: {
    avatar: null,
    username: '',
    password: '',
    repeatPassword: '',
    fistName: '',
    lastName: '',
    email: '',
    company: '',
    fax: '',
    phones: [],
    githubLink: '',
    facebookLink: '',
    additionalInfo: '',
  },
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
