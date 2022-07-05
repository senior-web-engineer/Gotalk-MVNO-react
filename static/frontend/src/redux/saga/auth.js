/* eslint-disable no-console */
import routes from '../../navigation/routes';
import accountTypes from '../workers/account/account-types';
import {
  signUp, signIn, checkAuth, multiFactorSignIn, restorePassword, setNewPassword, sendOuterActivation,
} from '../workers/auth';
import authTypes from '../workers/auth/auth-types';
import { startLoading, stopLoading } from '../workers/loading';
import {
  call, takeLatest, put,
} from 'redux-saga/effects';

const NOT_FOUND_STATUS_CODE = 404;
const redirectUrl = 'restore-password/reset';

function* signUpSaga(params) {
  try {
    yield put(startLoading('signUpLoading'));
    yield call(signUp, { ...params.payload.user, iccid: params.payload.iccid });
    yield put({ type: authTypes.SIGN_UP_SUCCESS });
    yield put({ type: authTypes.SAVE_USER, payload: { ...params.payload.user } });
    params.payload.redirect(routes.signIn.base);
  } catch (error) {
    console.log(error);

    if (error.response) {
      yield put({ type: authTypes.SIGN_UP_FAIL, payload: error.response.data.errors[0].msg });
    }
  } finally {
    yield put(stopLoading('signUpLoading'));
  }
}

function* signInSaga(params) {
  try {
    yield put(startLoading('signInLoading'));
    const { data } = yield call(signIn, { ...params.payload.userData });
    window.localStorage.setItem('got-accessToken', data.token);

    if (data.emailFactor && data.yubicoFactor) {
      yield put({ type: accountTypes.SEND_VERIFICATION_EMAIL_CODE });
      params.payload.redirect(routes.signIn.combined, { state: { email: data.user.email } });
    } else if (data.emailFactor) {
      yield put({ type: accountTypes.SEND_VERIFICATION_EMAIL_CODE });
      params.payload.redirect(routes.signIn.email, { state: { email: data.user.email } });
    } else if (data.yubicoFactor) {
      params.payload.redirect(routes.signIn.yubiKey, { state: { email: data.user.email } });
    } else {
      window.localStorage.setItem('got-user', JSON.stringify(data.user));

      yield put({ type: authTypes.SIGN_IN_SUCCESS, payload: data.user });
      yield put({ type: authTypes.SIGNED_IN });

      params.payload.redirect(routes.home);
    }
  } catch (error) {
    console.log(error);

    if (error.response) {
      yield put({ type: authTypes.SIGN_IN_FAIL, payload: error.response.data.message });
    }
  } finally {
    yield put(stopLoading('signInLoading'));
  }
}

function* multiFactorSignInSaga(params) {
  try {
    yield put(startLoading('mfaSignInLoading'));
    const { data } = yield call(multiFactorSignIn, { ...params.payload });

    window.localStorage.setItem('got-accessToken', data.token);
    window.localStorage.setItem('got-user', JSON.stringify(data.user));

    yield put({ type: authTypes.SIGN_IN_SUCCESS, payload: data.user });
    yield put({ type: authTypes.SIGNED_IN });

    if (params.navigate) {
      params.navigate(routes.home);
    }
  } catch (error) {
    console.log(error);

    if (error.response) {
      yield put({ type: authTypes.SIGN_IN_FAIL, payload: error.response.data.message });
    }
  } finally {
    yield put(stopLoading('mfaSignInLoading'));
  }
}

function* checkAuthSaga() {
  try {
    yield put(startLoading('checkAuthLoading'));
    const user = yield call(checkAuth);
    yield put({ type: authTypes.SAVE_USER, payload: user.data.payload });
    yield put({ type: authTypes.SIGNED_IN });
  } catch (error) {
    console.log(error);
    if (error.response?.status === NOT_FOUND_STATUS_CODE) {
      yield put({ type: authTypes.SIGNED_IN });
    }
  } finally {
    yield put(stopLoading('checkAuthLoading'));
  }
}

function* restorePasswordSaga(params) {
  try {
    yield call(restorePassword, { ...params.payload, redirectUrl });
    yield put({ type: authTypes.RESTORE_PASSWORD_SUCCESS });

    if (params.payload.navigate) {
      params
        .payload
        .navigate(routes.restorePassword.email, { state: { email: params.payload.email } });
    }
  } catch (error) {
    if (error.response) {
      yield put({
        type: authTypes.RESTORE_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }

    console.log(error);
  }
}

function* setNewPasswordSaga(params) {
  try {
    yield call(setNewPassword, params.payload);
    yield put({ type: authTypes.SET_NEW_PASSWORD_SUCCESS });

    if (params.payload.navigate) {
      params
        .payload
        .navigate(
          routes.restorePassword.resetSuccess,
          { state: { resetSuccess: true }, replace: true },
        );
    }
  } catch (error) {
    console.log(error.response);
    if (error.response) {
      yield put({ type: authTypes.SET_NEW_PASSWORD_FAIL, payload: error.response.data.message });
    }

    console.log(error);
  }
}

function* outerActivationSaga(params) {
  try {
    yield put(startLoading('outerActivationLoading'));
    const {iccid, zip} = params.payload.outerActivation;
    yield call(sendOuterActivation, { iccid, zip });
    yield put({ type: authTypes.OUTER_ACTIVATION_SUCCESS });
    params.payload.redirect(`${routes.signUp}?iccid=${iccid}&zip=${zip}`);
  } catch (error) {
    console.log(error);

    if (error.response) {
      yield put({ type: authTypes.OUTER_ACTIVATION_FAIL, payload: error.response.data.message });
    }
  } finally {
    yield put(stopLoading('outerActivationLoading'));
  }
}

export default function* authWatcher() {
  yield takeLatest([authTypes.SIGN_UP], signUpSaga);
  yield takeLatest([authTypes.SIGN_IN], signInSaga);
  yield takeLatest([authTypes.CHECK_AUTH], checkAuthSaga);
  yield takeLatest([authTypes.MULTI_FACTOR_AUTH], multiFactorSignInSaga);
  yield takeLatest([authTypes.RESTORE_PASSWORD], restorePasswordSaga);
  yield takeLatest([authTypes.SET_NEW_PASSWORD], setNewPasswordSaga);
  yield takeLatest([authTypes.OUTER_ACTIVATION], outerActivationSaga);
}
