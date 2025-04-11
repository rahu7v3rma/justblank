import { memo } from "react";

const Text = memo(
  ({
    children,
    className,
    onClick,
    size = "sm",
  }: {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    size?: "sm" | "md" | "lg";
  }) => {
    const spanSize =
      size == "sm" ? "text-sm" : size == "md" ? "text-md" : "text-lg";
    return (
      <span className={`${spanSize} ${className}`} onClick={onClick}>
        {children}
      </span>
    );
  }
);

export default Text;
