import { combineReducers } from "redux";

import userList from './userList';
import user from './user';
import userDraft from './userDraft';
import mainLanguageList from './mainLanguageList';
import hobbyList from './hobbyList';
import skillList from './skillList';

export default combineReducers({
  user,
  userList,
  userDraft,
  mainLanguageList,
  hobbyList,
  skillList,
});
