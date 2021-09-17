import { put, takeLatest, call, select } from 'redux-saga/effects';
import request from '../../redux/sagas/utils';
import { API, API_KEY } from './api';

import {
  GET_POPULAR_MOVIES,
  SEARCH_MOVIES,
} from './constants';

import { storeMovies } from './actions';

export default function* searchSaga() {
    yield takeLatest(GET_POPULAR_MOVIES, getPopularMovies);
    yield takeLatest(SEARCH_MOVIES, searchMovies);
}

function* getPopularMovies() {
  // yield put(setSearchLoading(true));
  try {
    const response = yield call(request, API.POPULAR_MOVIES + '?' + API_KEY, {
      method: 'GET',
    });
    yield put(storeMovies(response.results));
    // yield put(setSearchLoading(false));
  } catch (e) {
    // yield put(setSearchLoading(false));
  }
}

function* searchMovies(action) {
  // yield put(setSearchLoading(true));
  try {
    const response = yield call(request, API.SEARCH_MOVIES + action.payload + '&' + API_KEY, {
      method: 'GET',
    });
    yield put(storeMovies(response.results));
    // yield put(setSearchLoading(false));
  } catch (e) {
    // yield put(setSearchLoading(false));
  }
}

