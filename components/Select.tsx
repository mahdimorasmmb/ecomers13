import React, { useState } from "react";

export type Option = {
  value: string;
  label: string;
};

interface SelectProps extends React.ButtonHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  label?: React.ReactNode;
  warperClassName?: string;
  labelClassName?: string;
}

const Select = ({
  options,
  label,
  warperClassName,
  labelClassName,
  className,
  ...otherProps
}: SelectProps) => {
  return (
    <div className={`${warperClassName}`}>
      <label className={`block mb-1 ${labelClassName}`}> {label} </label>
      <select
        className={`${className} appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full `}
        {...otherProps}
      >
        {options.map((country) => (
          <option key={country.value} value={country.value}>
            {country.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
