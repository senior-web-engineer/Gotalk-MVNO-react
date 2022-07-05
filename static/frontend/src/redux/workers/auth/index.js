/* eslint-disable no-console */

import './auth-types';
import API from '../../../axios/api';
import { AUTH } from '../../../axios/api-urls';

const api = new API();

export const signUp = (userData) => api.post(AUTH.signUp, userData);

export const signIn = (userData) => api.post(AUTH.signIn, userData);

export const multiFactorSignIn = (userData) => api.post(AUTH.multiFactorSignIn, userData);

export const restorePassword = (userData) => api.post(AUTH.restorePassword, userData);

export const setNewPassword = (userData) => api.post(AUTH.setNewPassword, userData);

export const checkAuth = () => api.get(AUTH.checkAuth);

export const sendOuterActivation = (data) => api.post(AUTH.outerActivation, data);
