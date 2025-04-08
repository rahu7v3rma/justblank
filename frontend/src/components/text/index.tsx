import { memo } from "react";

const Text = memo(
  ({
    children,
    className,
    onClick,
  }: {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
  }) => {
    return (
      <span className={`text-sm ${className}`} onClick={onClick}>
        {children}
      </span>
    );
  }
);

export default Text;
