import React, { FC } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: React.ReactNode;
}

const Button: FC<Props> = ({ onClick, label }) => {
  return (
    <button
      className="px-4 py-2 inline-block border border-transparent bg-blue-600 text-white rounded-md hover:bg-blue-700"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
