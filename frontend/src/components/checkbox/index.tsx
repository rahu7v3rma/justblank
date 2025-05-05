import { memo } from 'react';
import Text from '../text';

const Checkbox = memo(
  ({
    value,
    onChange,
    errorMessage,
    label,
  }: {
    value: boolean;
    onChange: (newValue: boolean) => void;
    errorMessage?: string;
    label: string;
  }) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        <label className="flex flex-row gap-2 items-center">
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
          />
          <Text>{label}</Text>
        </label>
        {errorMessage && (
          <Text className="!text-red-500 !text-xs">{errorMessage}</Text>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
