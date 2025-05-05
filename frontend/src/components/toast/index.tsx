'use client';

import Text from '@/components/text';
import { ToastContext } from '@/context/toast';
import { memo, useContext } from 'react';
import Heading from '../heading';

const Toast = memo(() => {
  const { toastType, isOpen, toastTitle, allToasts } = useContext(ToastContext);

  if (!isOpen) return null;

  const toastTypeClass =
    toastType === 'error'
      ? 'bg-error-light'
      : toastType === 'info'
      ? 'bg-info-light'
      : 'bg-success-light';

  console.log(allToasts);

  return (
    <div className="absolute top-20 right-10 z-50 flex flex-col gap-2">
      {allToasts.map((toast, index) => (
        <div
          key={index}
          className={`gap-2 break-all max-w-[300px] rounded-md flex items-center justify-center p-2 ${toastTypeClass}`}
        >
          {toastTitle && <Heading>{toastTitle}</Heading>}
          <Text>{toast.message}</Text>
        </div>
      ))}
    </div>
  );
});

Toast.displayName = 'Toast';

export default Toast;
