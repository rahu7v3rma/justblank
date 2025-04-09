"use client";
import { memo, useState } from "react";
import TextButton from "../buttons/TextButton";

const Dropdown = memo(
  ({ label, options }: { label: string; options: string[] }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="flex items-center gap-1 relative">
        <TextButton onClick={() => setIsOpen(!isOpen)}>{label}</TextButton>
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white">
            {options.map((option) => (
              <TextButton key={option}>{option}</TextButton>
            ))}
          </div>
        )}
      </div>
    );
  }
);

export default Dropdown;
