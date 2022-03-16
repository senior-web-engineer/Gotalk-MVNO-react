/* eslint-disable no-console */
import routes from '../../navigation/routes';
import { PAYMENT_STATUSES } from '../reducers/payment';
import basketTypes from '../workers/basket/basket-types';
import { startLoading, stopLoading } from '../workers/loading';
import {
  buyPlan,
  buyPlanAuthorized,
  buyPlanCheck,
} from '../workers/payment/payment';
import paymentTypes from '../workers/payment/payment-types';
import get from 'lodash/get';
import { call, takeLatest, put } from 'redux-saga/effects';

function* buyPlanSaga(params) {
  try {
    yield put(startLoading('buyPlansLoading'));
    const { data } = yield call(buyPlan, params.payload);

    const payId = get(data, 'payload.payId', '');

    if (params.navigate) {
      params.navigate(routes.payment, {
        state: { clientSecret: data.payload.stripId, user: params.user, payId },
      });
    }
  } catch (error) {
    console.log(error);

    if (error.response) {
      yield put({
        type: paymentTypes.PAYMENT_FAILED,
        payload: error.response.data.payload.errors,
      });
    }
  } finally {
    yield put(stopLoading('buyPlansLoading'));
  }
}

function* buyPlanAuthorizedSaga(params) {
  try {
    yield put(startLoading('buyPlansAuthorizedLoading'));
    const { data } = yield call(buyPlanAuthorized, params.payload);

    const payId = get(data, 'payload.payId', '');

    if (params.navigate) {
      params.navigate(routes.payment, {
        state: { clientSecret: data.payload.stripId, user: params.user, payId },
      });
    }
  } catch (error) {
    console.log(error);

    if (error.response) {
      yield put({
        type: paymentTypes.PAYMENT_FAILED,
        payload: error.response.data.payload.errors,
      });
    }
  } finally {
    yield put(stopLoading('buyPlansAuthorizedLoading'));
  }
}

function* buyPlanCheckSaga({ payId = '', email = '' }) {
  try {
    yield call(buyPlanCheck, payId);

    yield put({
      type: paymentTypes.SET_PAYMENT_STATUS,
      paymentStatus: {
        status: PAYMENT_STATUSES.SUCCESS,
        message: `We’ll email ${email} a receipt for each invoice`,
      },
    });

    yield put({
      type: basketTypes.BASKET_UPDATE,
      payload: {
        totalCount: 0,
        totalPrice: 0,
        totalLines: 0,
      },
    });

    yield localStorage.setItem('basket', JSON.stringify([]));
  } catch (e) {
    const status = get(e, 'response.data.code', '');
    const message = get(e, 'response.data.message', '');

    if (status === 503) {
      yield put({
        type: paymentTypes.SET_PAYMENT_STATUS,
        paymentStatus: {
          status: PAYMENT_STATUSES.ERROR_STRIPE,
          message,
        },
      });
    }

    if (status === 507) {
      yield put({
        type: paymentTypes.SET_PAYMENT_STATUS,
        paymentStatus: {
          status: PAYMENT_STATUSES.ERROR_SIM_CARD,
          message,
        },
      });
    }
  }
}

function* buyPlanStripeSaga({
  stripe = {},
  clientSecret = '',
  paymentConfig = {},
  payId = '',
  email = '',
}) {
  yield stripe.confirmCardPayment(clientSecret, paymentConfig);

  yield call(buyPlanCheckSaga, { payId, email });
}

export default function* paymentWatcher() {
  yield takeLatest([paymentTypes.BUY_PLAN], buyPlanSaga);
  yield takeLatest([paymentTypes.BUY_PLAN_AUTHORIZED], buyPlanAuthorizedSaga);
  yield takeLatest([paymentTypes.BUY_PlAN_CHECK], buyPlanCheckSaga);
  yield takeLatest([paymentTypes.BUY_PLAN_STRIPE], buyPlanStripeSaga);
}
