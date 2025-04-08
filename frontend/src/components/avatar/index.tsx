import { memo } from "react";

const Avatar = memo(
  ({ initials, onClick }: { initials: string; onClick: () => void }) => {
    return (
      <div
        className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:opacity-70"
        onClick={onClick}
      >
        {initials}
      </div>
    );
  }
);

export default Avatar;
