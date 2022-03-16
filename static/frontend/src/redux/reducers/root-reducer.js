import accountReducer from './account';
import authReducer from './auth';
import basketReducer from './basket';
import loadingReducer from './loading';
import mainReducer from './main';
import payment from './payment';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  loadingReducer,
  authReducer,
  mainReducer,
  basketReducer,
  accountReducer,
  payment,
});

export default rootReducer;
