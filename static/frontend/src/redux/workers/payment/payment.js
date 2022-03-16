import API from '../../../axios/api';
import { PAYMENT } from '../../../axios/api-urls';

const api = new API();

export const buyPlan = (paymentData) => api.post(PAYMENT.buyPlans, paymentData, {
  headers: {
    'Content-Type': 'application/json',
  },
});

// eslint-disable-next-line max-len
export const buyPlanAuthorized = (paymentData) => api.post(PAYMENT.buyPlansAuthorized, paymentData, {
  headers: {
    'Content-Type': 'application/json',
  },
});

export const buyPlanCheck = (payId) => api.post(PAYMENT.buyPlansCheck, { payId });
