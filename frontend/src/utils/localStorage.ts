const AUTH_TOKEN_KEY = process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY;

export const getAuthToken = () => {
  return localStorage.getItem(AUTH_TOKEN_KEY!);
};

export const setAuthToken = (token: string) => {
  localStorage.setItem(AUTH_TOKEN_KEY!, token);
};

export const removeAuthToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY!);
};
