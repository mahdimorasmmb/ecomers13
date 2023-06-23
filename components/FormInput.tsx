import React, { FC, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  warperClassName?: string;
  labelClassName?: string;
}

const FormInput: FC<Props> = ({
  label,
  warperClassName,
  className,
  labelClassName,
  ...otherProps
}) => {
  return (
    <div className={`${warperClassName}`}>
      <label className={`block mb-1 ${labelClassName}`}> {label} </label>
      <input
        className={`appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full ${className}`}
        {...otherProps}
      />
    </div>
  );
};

export default FormInput;
