import React, { FC } from "react";

export interface TypeCategory {
  label: string;
  value: string;
}

interface Props extends React.InputHTMLAttributes<HTMLSelectElement> {
  options: TypeCategory[];
}

const SelectCategory: FC<Props> = ({ options, ...otherProps }) => {
  return (
    <select
      className="   px-6 select  active:!outline-none bg-[#f5f8fb] !outline-none active:bg-[#f5f8fb] rounded-full text-gray-400  "
      {...otherProps}
    >
      {options.map((item) => (
        <option className="py-2" key={item.label} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default SelectCategory;
