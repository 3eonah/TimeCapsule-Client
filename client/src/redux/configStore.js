import { combineReducers, applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './modules/user';
import capsule from './modules/capsule';

const rootReducer = combineReducers({
  user,
  capsule,
});

const logger = createLogger();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
);

export default store;
