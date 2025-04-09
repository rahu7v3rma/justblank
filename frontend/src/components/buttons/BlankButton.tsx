import { memo } from "react";

const BlankButton = memo(({ children }: { children: React.ReactNode }) => {
  return (
    <button className="cursor-pointer hover:opacity-50">{children}</button>
  );
});

export default BlankButton;
