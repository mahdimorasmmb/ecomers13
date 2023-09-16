import Button from "@/components/Button";
import React, { useState } from "react";

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="z-50">
      <Button className="p-0" variant="ghost" onClick={toggleMenu}>
        <svg
          className="h-9 w-9 fill-current transition-opacity duration-300 ease-in-out"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 5H21V7H3V5ZM3 11H21V13H3V11ZM3 17H21V19H3V17Z"
          />
        </svg>
      </Button>
      <div
        className={`${isOpen ? "  opacity-90 visible  " : " opacity-0 invisible "} 
        lg:hidden 
        absolute 
        top-0 
        left-0 
        w-screen 
        h-screen 
        bg-gray-800 
        
         
        flex-col  
        justify-start  
        transition-all 
        duration-300 
        ease-in
        py-3
        `}
      >
        <div className="flex  justify-center">
          <Button onClick={toggleMenu} variant="primary" className="flex-1">
            <i className="fa-solid text-2xl fa-xmark"></i>
          </Button>
        </div>
        <div className="flex justify-center">
          <ul className="text-white">
            <li className="py-4">Menu Item 1</li>
            <li className="py-4">Menu Item 2</li>
            <li className="py-4">Menu Item 3</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HamburgerMenu;
