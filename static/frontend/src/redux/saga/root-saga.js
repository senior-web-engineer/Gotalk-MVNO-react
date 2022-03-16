import accountWatcher from './account';
import authWatcher from './auth';
import paymentWatcher from './payment';
import plansWatcher from './plans';
import { all, fork } from 'redux-saga/effects';

const rootSaga = function* root() {
  yield all([fork(authWatcher)]);
  yield all([fork(plansWatcher)]);
  yield all([fork(paymentWatcher)]);
  yield all([fork(accountWatcher)]);
};

export default rootSaga;
