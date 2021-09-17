import { createAction } from 'redux-actions';
import {
  GET_POPULAR_MOVIES,
  STORE_MOVIES,
  SEARCH_MOVIES,
} from './constants';

export const getPopularMovies = createAction(GET_POPULAR_MOVIES);
export const storeMovies = createAction(STORE_MOVIES);
export const searchMovies = createAction(SEARCH_MOVIES);
