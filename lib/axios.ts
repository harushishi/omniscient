import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://api.spotify.com/v1',
});

// const AuthRequestInterceptor = (config: { headers: { Authorization: string; }; }) => {
//   const token = storage.getToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// };

// const SuccessResponseInterceptor = (res: { data: any; }) => res.data;

// const ErrorResponseInterceptor = (err: { message?: any; response?: any; }) => {
//   /* No internet connection */
//   if (err.message.includes('Network')) {
//     throw new Error('Network error');
//   }

//   const { response } = err;
//   const { status } = response;

//   if (status === 401) {
//     storage.clearToken();
//     window.location.assign(window.origin);
//     throw new Error('Unauthorized');
//   }

//   if (status === 400) {
//     throw new Error('Unauthorized');
//   }

//   if (status >= 500) {
//     throw new Error('Server error');
//   }

//   throw err;
// };

// axios.interceptors.request.use(AuthRequestInterceptor);
// axios.interceptors.response.use(SuccessResponseInterceptor, ErrorResponseInterceptor);

export { axios };