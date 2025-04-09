import Cookies from "js-cookie";

const AUTH_TOKEN_KEY = process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY;
const AUTH_USER_KEY = process.env.NEXT_PUBLIC_AUTH_USER_KEY;

export const getAuthToken = () => {
  return Cookies.get(AUTH_TOKEN_KEY!);
};

export const setAuthToken = (token: string) => {
  Cookies.set(AUTH_TOKEN_KEY!, token);
};

export const removeAuthToken = () => {
  Cookies.remove(AUTH_TOKEN_KEY!);
};

export const getUser = () => {
  const user = Cookies.get(AUTH_USER_KEY!);
  return user ? JSON.parse(user) : null;
};

export const setUser = (user: any) => {
  Cookies.set(AUTH_USER_KEY!, JSON.stringify(user));
};

export const removeUser = () => {
  Cookies.remove(AUTH_USER_KEY!);
};
