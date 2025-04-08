import { memo, ReactNode } from "react";

const TextButton = memo(
  ({
    children,
    className,
    onClick,
  }: {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
  }) => {
    return (
      <span
        className={`text-sm cursor-pointer hover:opacity-70 font-semibold ${className}`}
        onClick={onClick}
      >
        {children}
      </span>
    );
  }
);

export default TextButton;
