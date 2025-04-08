"use client";

import {
  getProfile as apiGetProfile,
  login as apiLogin,
  signup as apiSignup,
} from "@/utils/api";
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

export const AuthContext = createContext<AuthContextType>({
  user: null,
  signup: () => {},
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    apiGetProfile().then((response) => {
      if (response.success) {
        setUser(response.data);
      }
    });
  }, []);

  const { openLoader, closeLoader } = useContext(LoaderContext);
  const { triggerToast } = useContext(ToastContext);

  const router = useRouter();

  const signup = useCallback(
    async (
      name: string,
      email: string,
      password: string,
      confirmPassword: string
    ) => {
      openLoader();
      const response = await apiSignup(name, email, password, confirmPassword);
      closeLoader();
      if (!response.success) {
        triggerToast(response.message, "error");
        return;
      }
      triggerToast("Signup successful", "success");
      router.push("/login");
    },
    []
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
    triggerToast("Login successful", "success");
  }, []);

  const logout = useCallback(() => {
    openLoader();
    removeAuthToken();
    setUser(null);
    triggerToast("Logout successful", "success");
    closeLoader();
  }, []);

  useEffect(() => {
    if (
      user &&
      (window.location.pathname === "/login" ||
        window.location.pathname === "/signup")
    ) {
      router.push("/profile");
    }
    if (!user && window.location.pathname === "/profile") {
      router.push("/login");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
