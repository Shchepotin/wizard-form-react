import { combineReducers } from "redux";

import userList from './userList';
import user from './user';
import userDraft from './userDraft';

export default combineReducers({
  user,
  userList,
  userDraft,
});
