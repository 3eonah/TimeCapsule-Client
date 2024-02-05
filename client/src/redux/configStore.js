import { combineReducers, applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import user from './modules/user';
import capsule from './modules/capsule';
import storage from 'redux-persist/lib/storage'; //use local storage
import { persistStore, persistReducer } from 'redux-persist';

const rootReducer = combineReducers({
  user,
  capsule,
});

//create persist reducer
const persistConfig = {
  key: 'root', // localStorage key
  storage,
  whitelist: ['user', 'capsule'], // target reducer name
};

const logger = createLogger();

const store = createStore(
  persistReducer(persistConfig, rootReducer),
  // rootReducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
);

const persistor = persistStore(store);

export default store;
export { persistor };