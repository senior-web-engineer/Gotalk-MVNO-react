import accountWatcher from './account';
import authWatcher from './auth';
import paymentWatcher from './payment';
import plansWatcher from './plans';
import { all, fork } from 'redux-saga/effects';
import generalSettingsWatcher from "./general-settings";

const rootSaga = function* root() {
  yield all([fork(authWatcher)]);
  yield all([fork(plansWatcher)]);
  yield all([fork(paymentWatcher)]);
  yield all([fork(accountWatcher)]);
  yield all([fork(generalSettingsWatcher)]);
};

export default rootSaga;
