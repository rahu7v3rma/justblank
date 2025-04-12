import { memo } from "react";

const Button = memo(
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
        className={`w-full p-2 rounded-md cursor-pointer hover:opacity-70 bg-primary-light ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
