import { useState, useEffect, useRef } from 'react';

const useFocusStatus = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFocus = () => {
    setIsFocused(true);
    console.log('Input is focused.');
  };

  const handleBlur = () => {
    setIsFocused(false);
    console.log('Input is unfocused.');
  };

  useEffect(() => {
    const inputElement = inputRef.current;

    if (inputElement) {
      inputElement.addEventListener('focus', handleFocus);
      inputElement.addEventListener('blur', handleBlur);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener('focus', handleFocus);
        inputElement.removeEventListener('blur', handleBlur);
      }
    };
  }, []);

  return { isFocused, inputRef };
};

export default useFocusStatus;
