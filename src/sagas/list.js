import { put, all, call } from 'redux-saga/effects';
import Database from '../utils/Database';

import {
  receiveMainLanguageList,
} from '../actions/mainLanguageList';

import {
  receiveHobbyList,
} from '../actions/hobbyList';

import {
  receiveSkillList,
} from '../actions/skillList';

export function* watchRoot() {
  yield call(initState);
}

export function* initState() {
  const languages = yield call(() => Database
    .table('languages')
    .get()
  );

  const hobbies = yield call(() => Database
    .table('hobbies')
    .get()
  );

  const skills = yield call(() => Database
    .table('skills')
    .get()
  );

  yield put(receiveMainLanguageList(languages));
  yield put(receiveSkillList(skills));
  yield put(receiveHobbyList(hobbies));
}

export default function* rootSaga() {
  yield all([
    watchRoot(),
  ]);
}
