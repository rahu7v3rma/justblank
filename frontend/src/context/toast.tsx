'use client';

import { ToastContextType } from '@/utils/types';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

export const ToastContext = createContext<ToastContextType>({
  isOpen: false,
  toastMessage: '',
  toastType: 'success',
  triggerToast: () => {},
  toastTitle: '',
  setToastTitle: () => {},
  allToasts: [],
});

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [toastType, setToastType] = useState<'error' | 'success' | 'info'>(
    'success'
  );
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastTitle, setToastTitle] = useState<string>('');
  const [allToasts, setAllToasts] = useState<
    {
      message: string;
      type: 'error' | 'success' | 'info';
    }[]
  >([]);

  const triggerToast = useCallback(
    (toastMessage: string, toastType: 'error' | 'success' | 'info') => {
      setAllToasts((prev) => [
        ...prev,
        { message: toastMessage, type: toastType },
      ]);
      setTimeout(() => {
        setAllToasts(allToasts.slice(1));
      }, 3000);
    },
    [allToasts]
  );

  useEffect(() => {
    if (allToasts.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [allToasts]);

  return (
    <ToastContext.Provider
      value={{
        isOpen,
        toastMessage,
        toastType,
        triggerToast,
        toastTitle,
        setToastTitle,
        allToasts,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;

export const useToast = () => {
  return useContext(ToastContext);
};
