import routes from '../navigation/routes';

const authorizedAccessRoutes = [
  routes.account,
];

const UNAUTHORIZED_STATUS_CODE = 401;

export const requestInterceptorError = (error) => Promise.reject(error);

export const requestInterceptorSuccess = async (config) => {
  const accessToken = localStorage.getItem('got-accessToken');
  const authConfig = config;

  if (accessToken) {
    authConfig.headers.Authorization = `Bearer ${accessToken}`;
  }

  return authConfig;
};

export const responseInterceptorSuccess = async (request) => request;

export const responseInterceptorError = (error) => {
  switch (error.response?.status) {
    case UNAUTHORIZED_STATUS_CODE:
      if (authorizedAccessRoutes.includes(window.location.pathname)) {
        window.localStorage.setItem('got-accessToken', '');
        window.localStorage.setItem('got-user', '');
        window.location.href = routes.signIn.base;
      }
      return Promise.reject(error);

    default:
      return Promise.reject(error);
  }
};
