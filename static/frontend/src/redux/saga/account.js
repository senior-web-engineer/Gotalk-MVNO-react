/* eslint-disable no-console */
import createQueryParams from '../../shared/createQueryParams';
import delay from '../../shared/delay';
import accountTypes from '../workers/account/account-types';
import {
  getAccountData,
  setAccountData,
  putAccountData,
  postAccountPassword,
  getAccountProduct,
  getCurrentProduct,
  sendVerificationEmailCode,
  setMethodVerification,
  setVerificationEmailProgerss,
  setVerificationYubikeyProgress,
  postActivateSim,
  postChangeNumber,
  postActivateESim,
  getQr,
} from '../workers/account/index';
import { startLoading, stopLoading } from '../workers/loading';
import get from 'lodash/get';
import { call, takeLatest, put } from 'redux-saga/effects';

function* getAccountDataSaga() {
  try {
    yield put(startLoading('loadingAccountData'));

    const response = yield call(getAccountData);
    const data = yield get(response, 'data.payload', {});

    yield put(setAccountData(data));
  } catch (error) {
    console.log(error);
  } finally {
    yield delay(500);
    yield put(stopLoading('loadingAccountData'));
  }
}

function* putAccountDataSaga({ data }) {
  try {
    yield put(startLoading('loadingAccountData'));
    yield call(putAccountData, data);

    const responseNewData = yield call(getAccountData);
    const newData = yield get(responseNewData, 'data.payload', {});

    yield put(setAccountData(newData));
  } catch (error) {
    console.log(error);
  } finally {
    yield delay(500);
    yield put(stopLoading('loadingAccountData'));
  }
}

function* postAccountPasswordSaga({ body }) {
  try {
    yield put(startLoading('loadingAccountData'));
    yield call(postAccountPassword, body);
  } catch (error) {
    console.log(error);
  } finally {
    yield delay(500);
    yield put(stopLoading('loadingAccountData'));
  }
}

function* getAccountProductSaga() {
  try {
    yield put(startLoading('accountProductLoading'));
    const data = yield call(getAccountProduct);
    yield put({
      type: accountTypes.GET_PRODUCT_DATA,
      payload: data.data.payload,
    });
  } catch (error) {
    console.log(error);
  } finally {
    yield put(stopLoading('accountProductLoading'));
  }
}

function* currentProductSaga(params) {
  try {
    yield put(startLoading('currentProductLoading'));

    const data = yield call(getCurrentProduct, params.id);

    yield put({
      type: accountTypes.GET_CURRENT_PRODUCT,
      payload: data.data.payload,
    });
  } catch (error) {
    console.log(error);
  } finally {
    yield put(stopLoading('currentProductLoading'));
  }
}

export function* activateSimSaga(action) {
  try {
    const { ICCID, productId } = action.payload;

    yield put(startLoading('activateSimLoading'));

    const data = yield call(postActivateSim, { ICCID });

    yield put({
      type: accountTypes.POST_ACTIVATE_SIM,
      payload: data.data.payload,
      message: 'Activation successful',
    });

    yield call(currentProductSaga, { id: productId });
  } catch (error) {
    console.log(error);

    yield put({
      type: accountTypes.POST_ACTIVATE_SIM,
      payload: error.response.data.payload,
      message: 'Activation failed',
    });
  } finally {
    yield put(stopLoading('activateSimLoading'));
  }
}

export function* changeNumberSaga(body) {
  try {
    yield put(startLoading('changeNumberLoading'));
    const data = yield call(postChangeNumber, body.payload);
    yield put({
      type: accountTypes.POST_CHANGE_NUMBER,
      payload: data.data.payload,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: accountTypes.POST_CHANGE_NUMBER,
      payload: error.response.data.payload,
    });
    yield put({ type: accountTypes.ERROR_MESSAGE, payload: 'ERROR' });
  } finally {
    yield put(stopLoading('changeNumberLoading'));
  }
}

export function* activateESimSaga(body) {
  try {
    yield put(startLoading('activateEsimLoading'));
    const data = yield call(postActivateESim, body.payload);
    yield put({
      type: accountTypes.POST_ACTIVATE_ESIM,
      payload: data.data.payload,
      message: 'Activation successful',
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: accountTypes.POST_ACTIVATE_ESIM,
      payload: error.response.data.payload,
      message: 'Activation failed',
    });
  } finally {
    yield put(stopLoading('activateEsimLoading'));
  }
}

export function* scanQrSaga(body) {
  const paramsQr = createQueryParams(body.payload);
  try {
    yield put(startLoading('getQRLoading'));

    const response = yield call(getQr, paramsQr);
    const qr = get(response, 'data.payload', '');

    yield put({
      type: accountTypes.GET_QR,
      payload: `data:image/png;base64,${qr}`,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: accountTypes.GET_QR,
      payload: error.response.data.payload,
    });
  } finally {
    yield put(stopLoading('getQRLoading'));
  }
}

function* sendVerificationEmailCodeSaga() {
  try {
    yield put(startLoading('loadingaccountEditMethodVerification'));
    yield call(sendVerificationEmailCode);
  } catch (e) {
    console.log(e);
  } finally {
    yield delay(500);
    yield put(stopLoading('loadingaccountEditMethodVerification'));
  }
}

function* setMethodVerificationSaga({ data }) {
  try {
    yield put(startLoading('loadingaccountEditMethodVerification'));

    yield call(setMethodVerification, data);

    yield delay(500);
    yield put(stopLoading('loadingaccountEditMethodVerification'));

    if (data.emailFactor) {
      yield put(
        setVerificationEmailProgerss({ status: 'success', message: '' }),
      );
    }

    if (data.yubicoFactor) {
      yield put(
        setVerificationYubikeyProgress({ status: 'success', message: '' }),
      );
    }

    yield* getAccountDataSaga();
  } catch (e) {
    console.log(e);
    yield delay(500);
    yield put(stopLoading('loadingaccountEditMethodVerification'));

    if (data?.emailFactor) {
      yield put(
        setVerificationEmailProgerss({
          status: 'error',
          message: e?.response?.data?.message || 'Error',
        }),
      );
    }

    if (data?.yubicoFactor) {
      yield put(
        setVerificationYubikeyProgress({
          status: 'error',
          message: e?.response?.data?.message || 'Error',
        }),
      );
    }
  }
}

export default function* accountWatcher() {
  yield takeLatest([accountTypes.GET_ACCOUNT_DATA], getAccountDataSaga);
  yield takeLatest([accountTypes.PUT_ACCOUNT_DATA], putAccountDataSaga);
  yield takeLatest(
    [accountTypes.POST_ACCOUNT_PASSWORD],
    postAccountPasswordSaga,
  );
  yield takeLatest([accountTypes.LOAD_PRODUCT], getAccountProductSaga);
  yield takeLatest([accountTypes.LOAD_CURRENT_PRODUCT], currentProductSaga);
  yield takeLatest(
    [accountTypes.SEND_VERIFICATION_EMAIL_CODE],
    sendVerificationEmailCodeSaga,
  );
  yield takeLatest(
    [accountTypes.SET_METHOD_VERIFICATION],
    setMethodVerificationSaga,
  );
  yield takeLatest([accountTypes.LOAD_ACTIVATE_SIM], activateSimSaga);
  yield takeLatest([accountTypes.LOAD_CHANGE_NUMBER], changeNumberSaga);
  yield takeLatest([accountTypes.LOAD_ACTIVATE_ESIM], activateESimSaga);
  yield takeLatest([accountTypes.LOAD_GET_QR], scanQrSaga);
}
