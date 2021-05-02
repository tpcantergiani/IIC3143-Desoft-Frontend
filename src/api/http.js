/* eslint-disable no-param-reassign */
import axios from 'axios';

const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
    type: 'application/json',
  },
};

//  Hay que cambiar este por una variable de entorno
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(
  async (config) => {
    const persistRoot = await localStorage.getItem('persist:root');
    const { token } = JSON.parse(JSON.parse(persistRoot).user);
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

export default {
  get: (url, options = {}) => axios.get(url, { ...defaultOptions, ...options }),
  post: (url, data, options = {}) => axios.post(url, data, { ...defaultOptions, ...options }),
  patch: (url, data, options = {}) => axios.patch(url, data, { ...defaultOptions, ...options }),
  put: (url, data, options = {}) => axios.put(url, data, { ...defaultOptions, ...options }),
  delete: (url, options = {}) => axios.delete(url, { ...defaultOptions, ...options }),
};
