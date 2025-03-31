import Axios, { InternalAxiosRequestConfig } from 'axios';

import { env } from '@/config/env';
import { APP_PATH } from '@/config/paths';
import { toast } from 'sonner';
import { STORAGE_KEYS } from '@/config/storage';
import { convertSnakeToCamelCase } from '@/utils';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';

    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
    config.headers.Authorization = token ? `Bearer ${token}` : undefined;
  }

  // config.withCredentials = true;
  return config;
}

export const api = Axios.create({
  baseURL: env.API_URL,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return convertSnakeToCamelCase(response.data);
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    toast.error('Error', {
      description: message,
    });

    if (error.response?.status === 401) {
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      const searchParams = new URLSearchParams();
      const redirectTo = searchParams.get('redirectTo') || window.location.pathname;
      window.location.href = APP_PATH.auth.login.getHref(redirectTo);
    }

    return Promise.reject(error);
  },
);
