import React, { FC, PropsWithChildren, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const Container: FC<Props> = ({ children, className }) => {
  return <div className={`${className} container`}>{children}</div>;
};

export default Container;
