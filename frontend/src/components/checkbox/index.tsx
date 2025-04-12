import { memo } from 'react';
import Text from '../text';

const Checkbox = memo(
  ({
    value,
    onChange,
    errorMessage,
  }: {
    value: boolean;
    onChange: (newValue: boolean) => void;
    errorMessage?: string;
  }) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
        {errorMessage && (
          <Text className="!text-red-500 !text-xs">{errorMessage}</Text>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
