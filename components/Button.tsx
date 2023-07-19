import React, { FC } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: React.ReactNode;
  isLoding?: boolean;
}

const Button: FC<Props> = ({
  label,
  className,
  disabled,
  isLoding = false,
  ...otherProps
}) => {
  return (
    <button
      disabled={disabled}
      className={`${className}  ${disabled && 'bg-slate-200 outline-none cursor-not-allowed hover:bg-slate-200 text-slate-500 '} flex items-center  px-4 py-2 gap-2 border border-transparent bg-blue-600 text-white rounded-md hover:bg-blue-700`}
      {...otherProps}
    >
      {isLoding && <span className="loading loading-spinner"></span>}
      {label}
    </button>
  );
};

export default Button;
