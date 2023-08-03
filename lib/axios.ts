import Axios from 'axios';
import storage from '../utils/storage';

const axios = Axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    // Accept: 'application/json',
  },
});

const AuthRequestInterceptor = (config) => {
  const token = storage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

const SuccessResponseInterceptor = (res) => res.data;

const ErrorResponseInterceptor = (err) => {
  /* No internet connection */
  if (err.message.includes('Network')) {
    throw new Error('Network error');
  }

  const { response } = err;
  const { status } = response;

  if (status === 401) {
    storage.clearToken();
    window.location.assign(window.origin);
    throw new Error('Unauthorized');
  }

  if (status === 400) {
    throw new Error('Unauthorized');
  }

  if (status >= 500) {
    throw new Error('Server error');
  }

  throw err;
};

axios.interceptors.request.use(AuthRequestInterceptor);
axios.interceptors.response.use(SuccessResponseInterceptor, ErrorResponseInterceptor);

export { axios };