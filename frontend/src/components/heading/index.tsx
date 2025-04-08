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
    if (type === "h1") {
      return <h1 className={`text-4xl font-bold ${className}`}>{children}</h1>;
    }
    if (type === "h2") {
      return <h2 className={`text-3xl font-bold ${className}`}>{children}</h2>;
    }
    if (type === "h3") {
      return <span className={`text-2xl font-bold ${className}`}>{children}</span>;
    }
    if (type === "h4") {
      return <span className={`text-xl font-bold ${className}`}>{children}</span>;
    }
    if (type === "h5") {
      return <span className={`text-lg font-bold ${className}`}>{children}</span>;
    }
  }
);

export default Heading;
