import authTypes from '../workers/auth/auth-types';

const initialState = {
  isSignedIn: false,
  user: {},
  signUp: {
    error: '',
  },
  signIn: {
    error: '',
  },
  restorePassword: {
    error: '',
  },
  setNewPassword: {
    error: '',
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authTypes.SAVE_USER:
      return { ...state, user: { ...action.payload } };

    case authTypes.SIGN_UP_FAIL:
      return { ...state, signUp: { ...state.signUp, error: action.payload } };

    case authTypes.SIGN_UP_SUCCESS:
      return { ...state, signUp: { ...state.signUp, error: '' } };

    case authTypes.SIGN_IN_FAIL:
      return { ...state, signIn: { ...state.signIn, error: action.payload } };

    case authTypes.SIGN_IN_SUCCESS:
      return { ...state, signIn: { ...state.signIn, error: '' }, isSignedIn: true };

    case authTypes.RESTORE_PASSWORD_FAIL:
      return { ...state, restorePassword: { ...state.restorePassword, error: action.payload } };

    case authTypes.RESTORE_PASSWORD_SUCCESS:
      return { ...state, restorePassword: { ...state.restorePassword, error: '' } };

    case authTypes.SET_NEW_PASSWORD_SUCCESS:
      return { ...state, setNewPassword: { ...state.setNewPassword, error: action.payload } };

    case authTypes.SET_NEW_PASSWORD_FAIL:
      return { ...state, setNewPassword: { ...state.setNewPassword, error: '' } };

    case authTypes.SIGNED_IN:
      return { ...state, isSignedIn: true };

    case authTypes.LOGOUT:
      return { ...state, isSignedIn: false, user: {} };

    case authTypes.RESET_ERRORS:
      return {
        ...state,
        signUp: { error: '' },
        signIn: { error: '' },
        restorePassword: { error: '' },
        setNewPassword: { error: '' },
      };

    default:
      return state;
  }
};

export default authReducer;
