import { memo } from 'react';
import Text from '../text';

const Select = memo(
  ({
    options,
    value,
    onChange,
    errorMessage,
  }: {
    options: string[];
    value: string;
    onChange: (value: string) => void;
    errorMessage?: string;
  }) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        <select
          className="w-full border border-primary-light rounded-md p-2 text-sm"
          onChange={(e) => onChange(e.target.value)}
          value={value}
        >
          <option value={value}>{value}</option>
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        {errorMessage && <Text className="text-red-500">{errorMessage}</Text>}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
