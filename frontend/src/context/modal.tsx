'use client';

import { ModalContextType } from '@/utils/types';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';

export const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  ModalContent: null,
  openModal: () => {},
  closeModal: () => {},
});

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [ModalContent, setModalContent] = useState<ReactNode | null>(null);

  const openModal = useCallback((ModalContent?: ReactNode) => {
    setModalContent(ModalContent);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        openModal,
        closeModal,
        ModalContent,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;

export const useModal = () => {
  return useContext(ModalContext);
};
