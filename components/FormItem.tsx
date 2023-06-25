import React, { FC, ReactNode } from "react";

interface Props {
  label?: ReactNode;
  warperClassName?:string;
  labelClassName?: string;
  children?: ReactNode;
}

const FormItem: FC<Props> = ({
  label,
  labelClassName,
  warperClassName,
  children,
}) => {
  return (
    <div className={`${warperClassName}`}>
      <label className={`block mb-1 ${labelClassName}`}> {label} </label>
      {children}
    </div>
  );
};

export default FormItem;
