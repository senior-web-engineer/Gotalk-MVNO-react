import loadingTypes from '../workers/loading/loading-types';

const initialState = {
  isLoading: false,
  currentProductLoading: false,
  loadingAccountData: true,
  accountProductLoading: false,
  activateSimLoading: false,
  changeNumberLoading: false,
  activateEsimLoading: false,
  getQRLoading: true,
  isLoadingPlan: false,
  checkAuthLoading: true,
};

const DEFAULT_KEY = 'isLoading';

const loadingReducer = (state = initialState, action) => {
  const { key = DEFAULT_KEY } = action.payload || {};
  switch (action.type) {
    case loadingTypes.START_LOADING:
      return { ...state, [key]: true };

    case loadingTypes.STOP_LOADING:
      return { ...state, [key]: false };

    default:
      return state;
  }
};

export default loadingReducer;
