import { memo } from "react";
import Heading from "../heading";

const VerticalTabs = memo(
  ({
    options,
    selectedOption,
    setSelectedOption,
  }: {
    options: string[];
    selectedOption: string;
    setSelectedOption: (option: string) => void;
  }) => {
    return (
      <div className="w-[300px] border border-border-light rounded-md p-2">
        {options?.map((option) => (
          <div
            key={option}
            onClick={() => setSelectedOption(option)}
            className={`p-2 rounded-md cursor-pointer ${
              selectedOption === option
                ? "bg-primary-light"
                : "hover:bg-primary-lighter"
            }`}
          >
            <Heading type="h6">{option}</Heading>
          </div>
        ))}
      </div>
    );
  }
);

export default VerticalTabs;
