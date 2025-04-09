import { cookies } from "next/headers";
import { User } from "./types";

const AUTH_TOKEN_KEY = process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY;
const AUTH_USER_KEY = process.env.NEXT_PUBLIC_AUTH_USER_KEY;

export const getAuthToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_TOKEN_KEY!)?.value;
};

export const setAuthToken = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_TOKEN_KEY!, token);
};

export const removeAuthToken = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_TOKEN_KEY!);
};

export const getUser = async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const user = cookieStore.get(AUTH_USER_KEY!)?.value;
  return user ? JSON.parse(user) : null;
};

export const setUser = async (user: any) => {
  const cookieStore = await cookies();
  cookieStore.set(AUTH_USER_KEY!, JSON.stringify(user));
};

export const removeUser = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_USER_KEY!);
};
