import { all } from 'redux-saga/effects';

import user from './user';
import list from './list';

export default function* rootSaga() {
  yield all([
    user(),
    list(),
  ]);
}
