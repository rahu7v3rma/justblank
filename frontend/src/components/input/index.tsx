import { memo, useEffect, useRef, useState } from "react";
import Text from "../text";

const Input = memo(
  ({
    type,
    placeholder,
    value,
    onChange,
    className,
    errorMessage,
  }: {
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    errorMessage?: string;
  }) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        <input
          type={type}
          placeholder={placeholder}
          className={`text-sm border-[1px] border-border-light rounded-md p-2 ${className}`}
          value={value}
          onChange={onChange}
        />
        {errorMessage && (
          <Text className="!text-red-500 !text-xs">{errorMessage}</Text>
        )}
      </div>
    );
  }
);

export const SearchInput = memo(
  ({
    type,
    placeholder,
    value,
    onChange,
    className,
    errorMessage,
    options,
  }: {
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: (option: { label: string; value: string }) => void;
    className?: string;
    errorMessage?: string;
    options?: {
      label: string;
      value: string;
    }[];
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [selectedLabel, setSelectedLabel] = useState<string>("");
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
    return (
      <div className="flex flex-col gap-1 w-full relative" ref={ref}>
        <input
          type={type}
          placeholder={placeholder}
          className={`text-sm border-[1px] border-border-light rounded-md p-2 ${className}`}
          value={selectedLabel}
          onChange={(e) => {
            setSearchValue(e.target.value);
            setSelectedLabel(e.target.value);
          }}
          onClick={() => setIsOpen(!isOpen)}
        />
        {errorMessage && (
          <Text className="!text-red-500 !text-xs">{errorMessage}</Text>
        )}
        {options && options?.length > 0 && isOpen && (
          <div className="border border-border-light rounded-md  p-2 flex flex-col gap-1 w-full absolute top-full left-0 bg-white h-[200px] overflow-scroll mt-2">
            {options
              .filter((option) =>
                option.label.toLowerCase().includes(searchValue.toLowerCase())
              )
              .map((option) => (
                <Text
                  key={option.value}
                  className="cursor-pointer hover:bg-sky-200 p-2 rounded-md"
                  onClick={() => {
                    onChange?.(option);
                    setSelectedLabel(option.label);
                    setIsOpen(false);
                  }}
                >
                  {option.label}
                </Text>
              ))}
          </div>
        )}
      </div>
    );
  }
);

export default Input;
