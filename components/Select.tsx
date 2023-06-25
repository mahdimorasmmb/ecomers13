import React, { FC, useState } from "react";

export type Option = {
  value: string;
  label: string;
};

interface SelectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  options: Option[];
}

const Select: FC<SelectProps> = ({
  options,
  className,
  ...otherProps
}) => {
  return (
    <select
      className={`${className} appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full `}
      {...otherProps}
    >
      {options.map((country) => (
        <option  key={country.value} value={country.value}>
          {country.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
