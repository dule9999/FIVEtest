import { all, fork } from 'redux-saga/effects';

import searchSaga from '../../screens/Search/sagas';

export const rootSaga = function* rootSagas() {
  yield all([
    fork(searchSaga),
  ]);
};
