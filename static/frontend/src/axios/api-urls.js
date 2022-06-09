export const AUTH = {
  signUp: '/v1/auth/signup',
  signIn: '/v1/auth/login',
  checkAuth: '/v1/users/me',
  multiFactorSignIn: '/v1/mfa/verificationMFA',
  sendEmailCode: '/v1/mfa/sendEmail',
  restorePassword: '/v1/auth/password/reset',
  setNewPassword: '/v1/auth/password/set',
  adminSignin: '/v1/auth/adminSignin'
};

export const USERS = {};

export const MAIN = {
  plans: '/v1/plans',
};

export const PAYMENT = {
  buyPlans: '/v1/buy',
  buyPlansCheck: '/v1/buy/check',
  buyPlansAuthorized: '/v1/sim/buy',
};

export const ACCOUNT = {
  getUserData: '/v1/users/me',
  putUserData: '/v1/users',
  postUserPassword: '/v1/users/change-password',
  getProductInfo: '/v1/users/products',
  setMethodVerification: '/v1/mfa/switchMFA',
  sendVerificationEmailCode: '/v1/mfa/sendEmail',
  postActivateSim: '/v1/sim/activate-physical',
  postChangeNumber: '/v1/sim/set-phone',
  postActivateESim: '/v1/sim/esim/activate',
  getQr: '/v1/sim/esim/qr',
  createSetupIntent: '/v1/users/create-setup-intent',
  getSetupIntentResult: '/v1/users/get-setup-intent-result',
  getPaymentInformation: '/v1/users/get-payment-information',
  getCallHistory: '/v1/users/get-call-history',
  getSmsHistory: '/v1/users/get-sms-history',
  getPaymentHistory: '/v1/users/get-payment-history'
};

export const COUPON = {
  canUseCoupon: '/v1/coupons/canUseCoupon'
}
