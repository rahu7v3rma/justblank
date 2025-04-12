"use client";

import {
  getProfile as apiGetProfile,
  login as apiLogin,
  register as apiRegister,
} from "@/services/api";
import { removeAuthToken, setAuthToken } from "@/utils/localStorage";
import { AuthContextType, User } from "@/utils/types";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { LoaderContext } from "./loader";
import { ToastContext } from "./toast";
import {
  setUser as cookieSetUser,
  removeUser as cookieRemoveUser,
  removeAuthToken as cookieRemoveAuthToken,
  setAuthToken as cookieSetAuthToken,
} from "@/utils/clientCookies";
import { getUserHomePath } from "@/utils/auth";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  signup: () => {},
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const updateUser = useCallback(() => {
    apiGetProfile().then((response) => {
      if (response.success) {
        setUser(response.data);
        cookieSetUser(response.data);
        router.push(getUserHomePath(response.data.role));
      }
    });
  }, [router]);

  useEffect(() => {
    updateUser();
  }, [updateUser]);

  const { openLoader, closeLoader } = useContext(LoaderContext);
  const { triggerToast } = useContext(ToastContext);

  const signup = useCallback(
    async (
      name: string,
      email: string,
      password: string,
      confirmPassword: string
    ) => {
      openLoader();
      const response = await apiRegister(
        name,
        email,
        password,
        confirmPassword
      );
      closeLoader();
      if (!response.success) {
        triggerToast(response.message, "error");
        return;
      }
      triggerToast("Registration successful", "success");
      router.push("/verify-email");
    },
    [openLoader, closeLoader, triggerToast, router]
  );

  const login = useCallback(async (email: string, password: string) => {
    openLoader();
    const response = await apiLogin(email, password);
    closeLoader();
    if (!response.success) {
      triggerToast(response.message, "error");
      return;
    }
    setAuthToken(response.data.token);
    cookieSetAuthToken(response.data.token);
    triggerToast("Login successful", "success");
    updateUser();
  }, [openLoader, closeLoader, triggerToast, updateUser, router]);

  const logout = useCallback(() => {
    openLoader();
    removeAuthToken();
    cookieRemoveAuthToken();
    setUser(null);
    cookieRemoveUser();
    triggerToast("Logout successful", "success");
    closeLoader();
    router.push("/login");
  }, [closeLoader, openLoader, triggerToast, router]);

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
