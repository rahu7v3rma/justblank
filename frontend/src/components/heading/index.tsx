import { memo } from "react";

const Heading = memo(
  ({
    children,
    type = "h3",
    className,
  }: {
    children: React.ReactNode;
    type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    className?: string;
  }) => {
    const textClass =
      type === "h1"
        ? "text-4xl"
        : type === "h2"
        ? "text-3xl"
        : type === "h3"
        ? "text-2xl"
        : type === "h4"
        ? "text-xl"
        : type === "h5"
        ? "text-lg"
        : "text-md";
    return <span className={`${textClass} font-bold ${className}`}>{children}</span>;
  }
);

export default Heading;
