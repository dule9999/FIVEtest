import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from '../sagas';
import rootReducer from '../reducers';

export default function configureStore() {
  const middlewaresToApply = [];

  const sagaMiddleware = createSagaMiddleware({
    onError: (error) => {
      console.log('Saga error = ', error);
    },
  });

  const middleware = applyMiddleware(sagaMiddleware, ...middlewaresToApply);

  const composeEnhancers = compose;
  const enchancedMiddleware = composeEnhancers(middleware);
  const store = createStore(rootReducer, enchancedMiddleware);

  store.runSaga = sagaMiddleware.run;
  store.runSaga(rootSaga);

  return store;
}

const store = configureStore();

export const ReduxProvider = ({ children }) => <Provider store={store}>{children}</Provider>;
