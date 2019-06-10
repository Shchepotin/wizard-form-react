import { put, takeLatest, takeEvery, select, all, call, delay } from 'redux-saga/effects';
import Database from '../utils/Database';
import history from '../history';

import {
  STORE_USER_DRAFT,
  SYNC_USER_DRAFT,
  RECEIVE_USER_DRAFT,
  receiveUserDraft,
} from '../actions/userDraft';

import {
  REQUEST_USER,
  SAVE_USER,
  receiveUser,
} from '../actions/user';

import {
  REQUEST_USER_LIST,
  receiveUserList,
} from '../actions/userList';

export function* watchRoot() {
  yield takeEvery(STORE_USER_DRAFT, watchStoreUserDraft);
  yield takeEvery(REQUEST_USER, watchRequestUser);
  yield takeEvery(SYNC_USER_DRAFT, watchSilentSyncUserDraft);
  yield takeEvery(SAVE_USER, watchSaveUser);
  yield takeEvery(REQUEST_USER_LIST, watchRequestUserList);
  yield takeLatest(RECEIVE_USER_DRAFT, syncState);
  yield call(initState);
}

export function* watchRequestUser(data) {
  const user = yield call(() => Database
    .table('users')
    .where(item => item.id === data.payload.id)
    .first()
  );

  yield put(receiveUser(user));
}

export function* watchRequestUserList() {
  const users = yield call(() => Database
    .table('users')
    .get()
  );

  yield put(receiveUserList(users));
}

export function* watchSaveUser(data) {
  yield call(() => Database
    .table('users')
    .save(data.payload)
  );

  history.goBack();
}

export function* watchSilentSyncUserDraft(data) {
  yield call(() => Database
    .table('userDraft')
    .save({
      id: 1,
      ...data.payload,
    })
  );
}

export function* watchStoreUserDraft(data) {
  delete data.payload.id;

  yield call(() => Database
    .table('users')
    .save(data.payload)
  );

  const users = yield call(() => Database
    .table('users')
    .get()
  );

  yield put(receiveUserList(users));
}

export function* syncState() {
  yield delay(300);

  const { userDraft: { item } } = yield select();

  yield call(() => Database
    .table('userDraft')
    .save({
      id: 1,
      ...item,
    })
  );
}

export function* initState() {
  const userDraft = yield call(() => Database
    .table('userDraft')
    .first()
  );

  yield put(receiveUserDraft(userDraft));
}

export default function* rootSaga() {
  yield all([
    watchRoot(),
  ]);
}
