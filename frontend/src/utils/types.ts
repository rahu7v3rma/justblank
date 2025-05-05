import { ReactNode } from 'react';

export type ToastContextType = {
  isOpen: boolean;
  toastMessage: string;
  toastType: 'error' | 'success' | 'info';
  triggerToast: (
    toastMessage: string,
    toastType: 'error' | 'success' | 'info'
  ) => void;
  toastTitle: string;
  setToastTitle: (toastTitle: string) => void;
  allToasts: {
    message: string;
    type: 'error' | 'success' | 'info';
  }[];
};

export type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

export type ModalContextType = {
  isOpen: boolean;
  openModal: (ModalContent?: ReactNode) => void;
  closeModal: () => void;
  ModalContent: ReactNode | null;
};

export type AuthContextType = {
  user: User | null;
  logout: () => void;
  signup: (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => void;
  login: (email: string, password: string) => void;
};

export type LoaderContextType = {
  isOpen: boolean;
  openLoader: (loaderMessage?: string) => void;
  closeLoader: () => void;
  loaderMessage: string;
};
