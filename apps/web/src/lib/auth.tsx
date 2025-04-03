import { configureAuth } from 'react-query-auth';
import { Navigate, useLocation } from 'react-router';
import { z } from 'zod';

import { APP_PATH } from '@/config/paths';
import { AuthResponse, User } from '@/types/api';

import { STORAGE_KEYS } from '@/config/storage';
import { convertCamelToSnakeCase } from '@/utils';
import { api } from './api-client';

const getUser = async (): Promise<User | null> => {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  if (!token) {
    return null;
  }
  try {
    const response = await api.get('/users/me');

    return response.data;
  } catch {
    return null;
  }
};

const logout = async (): Promise<void> => {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
};

export const loginInputSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  password: z.string().min(5, 'Required'),
});

export type LoginInput = z.infer<typeof loginInputSchema>;
const loginWithEmailAndPassword = async (data: LoginInput): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

export const registerInputSchema = z.object({
  email: z.string().min(1, 'Required'),
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  password: z.string().min(5, 'Required'),
});

export type RegisterInput = z.infer<typeof registerInputSchema>;

const registerWithEmailAndPassword = async (data: RegisterInput): Promise<User | null> => {
  await api.post('/auth/register', convertCamelToSnakeCase(data));

  return null;
};

const authConfig = {
  userFn: getUser,
  loginFn: async (data: LoginInput) => {
    const response = await loginWithEmailAndPassword(data);
    localStorage.setItem(STORAGE_KEYS.TOKEN, response.accessToken);
    return response.user;
  },
  registerFn: async (data: RegisterInput) => {
    return registerWithEmailAndPassword(data);
  },
  logoutFn: logout,
};

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } = configureAuth(authConfig);

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useUser();
  const location = useLocation();

  if (!user.data) {
    return <Navigate to={APP_PATH.auth.login.getHref(location.pathname)} replace />;
  }

  return children;
};
