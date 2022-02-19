import { api } from '.';

api.interceptors.request.use(
  (config: any) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
