import { memo } from "react";
import Heading from "../heading";
import Text from "../text";

const Table = memo(
  ({
    columns,
    data,
    className,
    title,
  }: {
    columns: {
      label: string;
      key: string;
    }[];
    data: {
      [key: string]: string;
    }[];
    className?: string;
    title?: string;
  }) => {
    return (
      <div
        className={`flex flex-col gap-2 items-center justify-center border-primary-light border rounded-md ${className}`}
      >
        <table className={`w-full`}>
          <thead className="">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="p-2 border-b border-primary-light"
                >
                  <Heading type="h6">{column.label}</Heading>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((row, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td key={column.key} className="text-center px-2 py-1">
                    <Text>{row[column.key]}</Text>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {data?.length == 0 && (
          <Text className="text-center w-full py-2">No data found</Text>
        )}
      </div>
    );
  }
);

Table.displayName = 'Table';

export default Table;
