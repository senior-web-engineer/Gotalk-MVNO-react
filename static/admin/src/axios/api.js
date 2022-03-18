import axios from "axios";
import {
  requestInterceptorError,
  requestInterceptorSuccess,
  responseInterceptorSuccess,
  responseInterceptorError,
} from "./interceptors";

const baseUrl = process.env.REACT_APP_URL || "https://gotalkwireless.com/api/";

class Api {
  config = {
    base: baseUrl,
    timeount: 10000,
  };

  url = baseUrl;

  constructor() {
    this.instance = axios.create(this.config);
    this.instance.interceptors.request.use(
      requestInterceptorSuccess,
      requestInterceptorError
    );
    this.instance.interceptors.response.use(
      responseInterceptorSuccess,
      responseInterceptorError
    );
  }

  get = async (path = "", axiosRequestConfig = {}) =>
    this.instance.get(this.url + path, axiosRequestConfig);

  post = async (path = "", body = {}, axiosRequestConfig = {}) =>
    this.instance.post(this.url + path, body, axiosRequestConfig);

  put = async (path = "", body = {}, axiosRequestConfig = {}) =>
    this.instance.put(this.url + path, body, axiosRequestConfig);

  delete = async (path = "", body = {}, axiosRequestConfig = {}) =>
    this.instance.delete(this.url + path, body, axiosRequestConfig);
}

export default Api;
