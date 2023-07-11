import React, { FC, InputHTMLAttributes } from "react";

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...otherProps
}) => {
  return (
    <input
      className={` ${className} appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full `}
      {...otherProps}
    />
  );
};

export default Input;
