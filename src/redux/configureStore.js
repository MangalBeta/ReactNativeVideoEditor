import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import configureReducer from './reducers';
import rootSaga from './sagas';

const configureStore = () => {
  const composeEnhancers =
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
        traceLimit: 25,
      })) ||
    compose;

  const sagaMiddleware = createSagaMiddleware();
  const reducer = configureReducer();
  const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(sagaMiddleware)),

  );
  sagaMiddleware.run(rootSaga);
  return store;
};

export const store = configureStore();
