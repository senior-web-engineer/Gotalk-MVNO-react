export const requestInterceptorError = (error) => Promise.reject(error);

export const requestInterceptorSuccess = async (config) => {
  const storageAccessToken = localStorage.getItem("auth");
  const accessToken = JSON.parse(storageAccessToken);
  const authConfig = config;
  if (accessToken) {
    authConfig.headers.Authorization = `Bearer ${accessToken}`;
  }

  return authConfig;
};

export const responseInterceptorSuccess = async (request) => request;

export const responseInterceptorError = (error) => Promise.reject(error);
