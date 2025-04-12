import { memo } from 'react';

const BlankButton = memo(
  ({
    children,
    onClick,
    className,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
  }) => {
    return (
      <button
        className={`cursor-pointer hover:opacity-50 ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
);

BlankButton.displayName = 'BlankButton';

export default BlankButton;
