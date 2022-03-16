import {
  requestInterceptorSuccess,
  requestInterceptorError,
  responseInterceptorSuccess,
  responseInterceptorError,
} from './interceptors';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_URL || '';

class API {
  config = {
    baseURL: BASE_URL,
    timeout: 10000,
  };

  url = BASE_URL;

  constructor() {
    this.instance = axios.create(this.config);
    this.instance.interceptors.request.use(requestInterceptorSuccess, requestInterceptorError);
    this.instance.interceptors.response.use(responseInterceptorSuccess, responseInterceptorError);
  }

  get = async (path = '', axiosRequestConfig = {}) => this.instance.get(this.url + path, axiosRequestConfig);

  post = async (path = '', body = {}, axiosRequestConfig = {}) => this.instance.post(this.url + path, body, axiosRequestConfig);

  put = async (path = '', body = {}, axiosRequestConfig = {}) => this.instance.put(this.url + path, body, axiosRequestConfig);
}
export default API;
