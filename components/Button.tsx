import React, { FC } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: React.ReactNode;
}

const Button: FC<Props> = ({ label,className, ...otherProps }) => {
  return (
    <button
      className={`${className}  px-4 py-2 inline-block border border-transparent bg-blue-600 text-white rounded-md hover:bg-blue-700`}
      {...otherProps}
    >
      {label}
    </button>
  );
};

export default Button;
