import accountTypes from './account-types';
import API from '../../../axios/api';
import { ACCOUNT } from '../../../axios/api-urls';

const api = new API();

export const getAccountData = () => api.get(ACCOUNT.getUserData);

export const setAccountData = (data) => ({ type: accountTypes.SET_ACCOUNT_DATA, data });

export const putAccountData = (body) => api.put(ACCOUNT.putUserData, body);

export const postAccountPassword = (body) => api.post(ACCOUNT.postUserPassword, body);

export const getAccountProduct = () => api.get(ACCOUNT.getProductInfo);

export const getCurrentProduct = (id) => api.get(`${ACCOUNT.getProductInfo}/${id}`);

export const sendVerificationEmailCode = () => api.get(ACCOUNT.sendVerificationEmailCode);

export const setMethodVerification = (body) => api.post(ACCOUNT.setMethodVerification, body);

export const setVerificationEmailProgerss = (progress) => ({
  type: accountTypes.SET_VERIFICATION_EMAIL_PROGERSS,
  progress,
});

export const setVerificationYubikeyProgress = (progress) => ({
  type: accountTypes.SET_VERIFICATION_YUBIKEY_PROGRESS,
  progress,
});

export const postActivateSim = (body) => api.post(ACCOUNT.postActivateSim, body);

export const postChangeNumber = (body) => api.post(ACCOUNT.postChangeNumber, body);

export const postActivateESim = (body) => api.post(ACCOUNT.postActivateESim, body);

export const getQr = (id) => api.get(`${ACCOUNT.getQr}${id}`);

export const createSetupIntent = () => api.post(ACCOUNT.createSetupIntent);

export const getSetupIntentResult = (setupIntentId) => api.get(`${ACCOUNT.getSetupIntentResult}/${setupIntentId}`);

export const getPaymentInformation = (userSimPlanId) => api.get(`${ACCOUNT.getPaymentInformation}/${userSimPlanId}`);

export const getCallHistory = (userSimPlanId, count = 0) => api.get(`${ACCOUNT.getCallHistory}/${userSimPlanId}/${count}`);

export const getSmsHistory = (userSimPlanId, count = 0) => api.get(`${ACCOUNT.getSmsHistory}/${userSimPlanId}/${count}`);
