import {
  RECEIVE_USER_DRAFT,
} from '../actions/userDraft';

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
    birthDate: null,
    email: '',
    address: '',
    gender: null,
    company: '',
    fax: '',
    phones: [''],
    githubLink: '',
    facebookLink: '',
    additionalInfo: '',
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_USER_DRAFT:
      return {
        ...state,
        item: action.payload || initialState.item,
      };
    default:
      return state;
  }
};
