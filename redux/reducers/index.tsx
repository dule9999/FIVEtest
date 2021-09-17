import { combineReducers } from 'redux';

import { searchReducer } from '../../screens/Search/reducers';

export default combineReducers({
    search: searchReducer,
});