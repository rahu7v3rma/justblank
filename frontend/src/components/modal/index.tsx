'use client';
import { useModal } from '@/context/modal';
import { memo } from 'react';
import { IoClose } from 'react-icons/io5';
import BlankButton from '../buttons/BlankButton';

const Modal = memo(() => {
  const { ModalContent, isOpen, closeModal } = useModal();
  if (!isOpen) return null;
  return (
    <div className="flex justify-center items-center h-screen absolute z-50 top-0 left-0 w-full bg-white/50">
      <div className="flex flex-col gap-2 bg-white p-20 w-1/2 min-h-1/2 border border-primary-light rounded-md relative">
        {ModalContent}
        <BlankButton onClick={closeModal} className="w-max absolute right-5 top-5">
          <IoClose size={30}/>
        </BlankButton>
      </div>
    </div>
  );
});

Modal.displayName = 'Modal';

export default Modal;
