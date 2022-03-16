import loadingTypes from './loading-types';

export const startLoading = (key) => ({
  type: loadingTypes.START_LOADING,
  payload: { key },
});

export const stopLoading = (key) => ({
  type: loadingTypes.STOP_LOADING,
  payload: { key },
});
