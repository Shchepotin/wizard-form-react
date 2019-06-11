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
    skills: null,
    hobbies: null,
    phones: [''],
    githubLink: '',
    facebookLink: '',
    mainLanguage: null,
    additionalInfo: '',
    createdAt: null,
    updatedAt: null,
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
