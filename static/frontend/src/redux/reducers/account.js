import accountTypes from '../workers/account/account-types';

const initialState = {
  accountData: {},
  accountProduct: [],
  currentProduct: [],
  verificationEmailProgerss: {
    status: '',
    message: '',
  },
  verificationYubikeyProgress: {
    status: '',
    message: '',
  },
  activatedSim: [],
  changeNumber: [],
  activatedESim: [],
  qrActivate: '',
  errorMessage: '',
  activationMessage: '',
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case accountTypes.SET_ACCOUNT_DATA:
      return { ...state, accountData: action.data };
    case accountTypes.GET_PRODUCT_DATA:
      return { ...state, accountProduct: action.payload };
    case accountTypes.GET_CURRENT_PRODUCT:
      return { ...state, currentProduct: action.payload };
    case accountTypes.SET_VERIFICATION_EMAIL_PROGERSS:
      return { ...state, verificationEmailProgerss: action.progress };
    case accountTypes.SET_VERIFICATION_YUBIKEY_PROGRESS:
      return { ...state, verificationYubikeyProgress: action.progress };
    case accountTypes.POST_ACTIVATE_SIM:
      return { ...state, activatedSim: action.payload, activationMessage: action.message };
    case accountTypes.POST_CHANGE_NUMBER:
      return { ...state, changeNumber: action.payload };
    case accountTypes.POST_ACTIVATE_ESIM:
      return { ...state, activatedESim: action.payload, activationMessage: action.message };
    case accountTypes.GET_QR:
      return { ...state, qrActivate: action.payload };
    case accountTypes.ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

export default accountReducer;
