import axios from 'axios';
import { getAuthToken } from '../utils/localStorage';

const request = async (url: string, method: string, data: any) => {
  try {
    const token = getAuthToken();
    const request = await axios.request({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      url,
      method,
      data,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: token }),
      },
    });
    return request.data;
  } catch (error: any) {
    return {
      success: error?.response?.data?.success ?? false,
      message: error?.response?.data?.message ?? 'Something went wrong',
      data: error?.response?.data?.data ?? null,
    };
  }
};

export const register = async (
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  const response = await request('/user/register', 'POST', {
    name,
    email,
    password,
    confirmPassword,
  });
  return response;
};

export const login = async (email: string, password: string) => {
  const response = await request('/user/login', 'POST', {
    email,
    password,
  });
  return response;
};

export const getProfile = async () => {
  const response = await request('/user/profile', 'GET', {});
  return response;
};

export const connectAPI = async () => {
  const response = await request('/connect', 'GET', {});
  return response;
};

export const verifyEmail = async (email: string, verificationCode: string) => {
  const response = await request('/user/verify-email', 'POST', {
    email,
    verificationCode,
  });
  return response;
};

export const getUsers = async (role: string) => {
  const response = await request(`/superuser/users?role=${role}`, 'GET', {});
  return response;
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  role: string,
  isEmailVerified: boolean,
  sendVerificationEmail: boolean
) => {
  const response = await request('/superuser/user', 'POST', {
    name,
    email,
    password,
    confirmPassword,
    role,
    isEmailVerified,
    sendVerificationEmail,
  });
  return response;
};

export const editUser = async (
  _id: string,
  name?: string,
  email?: string,
  password?: string,
  confirmPassword?: string,
  role?: string,
  isEmailVerified?: boolean,
  sendVerificationEmail?: boolean
) => {
  const response = await request(`/superuser/user/${_id}`, 'PUT', {
    name,
    email,
    password,
    confirmPassword,
    role,
    isEmailVerified,
    sendVerificationEmail,
  });
  return response;
};

export const deleteUser = async (_id: string) => {
  const response = await request(`/superuser/user/${_id}`, 'DELETE', {});
  return response;
};
