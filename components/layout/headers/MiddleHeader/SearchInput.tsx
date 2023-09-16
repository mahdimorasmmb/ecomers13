

import React, { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
}

const SearchInput: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { className, ...rest },
  ref
) => {
  return (
    <input
      type="text"
      {...rest}
      ref={ref}
      className={`${className} input w-full focus:outline-0 bg-[#f5f8fb] placeholder:text-gray-400`}
    />
  );
};

export default forwardRef(SearchInput);
