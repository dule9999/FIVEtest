import { STORE_MOVIES } from "./constants";

export const initialAppState = {
  movies: []
};

export const searchReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case STORE_MOVIES: {
      return {
        ...state,
        movies: action.payload
      };
    }
    default:
      return state;
  }
};
