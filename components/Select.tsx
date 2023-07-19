import React, { FC, useState } from "react";

export type Option = {
  value: string;
  label: string;
};

interface SelectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  disabledOption?: number;
}

const Select: FC<SelectProps> = ({
  options,
  className,
  disabledOption = 100,
  ...otherProps
}) => {
  return (
    <>
      <select
        className={`${className} bg-gray-100 border-gray-100 select select-ghost w-full  `}
        {...otherProps}
      >
        {options.map((country, i) => {
          if (disabledOption === i) {
            return (
              <option
                disabled
                selected
                key={country.value}
                value={country.value}
              >
                {country.label}
              </option>
            );
          }
          return (
            <option key={country.value} value={country.value}>
              {country.label}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default Select;
