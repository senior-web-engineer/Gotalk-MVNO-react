import paymentTypes from '../workers/payment/payment-types';

export const PAYMENT_STATUSES = {
  DISABLE: 'disable',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR_STRIPE: 'error stripe',
  ERROR_SIM_CARD: 'error sim card',
};

const initialState = {
  errors: [],
  paymentStatus: {
    status: PAYMENT_STATUSES.DISABLE,
    message: '',
  },
  checkoutDatas: null
};

const payment = (state = initialState, action) => {
  switch (action.type) {
    case paymentTypes.PAYMENT_FAILED:
      return { ...state, errors: action.payload };

    case paymentTypes.RESET_PAYMENT_ERRORS:
      return { ...state, errors: [] };

    case paymentTypes.SET_PAYMENT_STATUS:
      return { ...state, paymentStatus: action.paymentStatus };

    case paymentTypes.CHECKOUT_DATAS:
      return { ...state, checkoutDatas: action.payload };

    default:
      return state;
  }
};

export default payment;
