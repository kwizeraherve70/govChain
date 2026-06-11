import React, { useState, useRef } from 'react';
import { IoMdMore } from 'react-icons/io';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { ChangeRoleThunk } from '@/Redux/action/ChangeRole';

const DropdownMenu = ({ ProfileId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState(null);
  const buttonRef = useRef(null);
  const dispatch = useDispatch()
  const toggleDropdown = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({ top: rect.bottom, left: rect.left });
    }
    setIsOpen((prev) => !prev);
  };
  const RoleChanger=(role)=>{
    const data= {
      ProfileId,
      Role: role
    }
    dispatch(ChangeRoleThunk(data))
  }

  // Dropdown content
  const dropdownContent = (
    <div
      style={{
        top: position?.top || 0,
        left: position?.left || 0,
      }}
      className="fixed z-50 w-40 bg-[#0c0d22] border border-white/10 rounded-xl shadow-xl backdrop-blur-md"
    >
      <div className="py-1" role="menu" aria-orientation="vertical">
        <a href="#" onClick={()=>{RoleChanger("HIGH_OFFICIAL")}} className="block px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors" role="menuitem">
          HIGH_OFFICIAL
        </a>
        <a href="#" onClick={()=>{RoleChanger("LOCAL_LEADER")}} className="block px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors" role="menuitem">
          LOCAL_LEADER
        </a>
        <a href="#" onClick={()=>{RoleChanger("CITIZEN")}} className="block px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors" role="menuitem">
          CITIZEN
        </a>
      </div>
    </div>
  );

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="flex items-center justify-center w-8 h-8 focus:outline-none"
        aria-expanded={isOpen}
      >
        <IoMdMore className="w-5 h-5" />
      </button>
      {isOpen && position && ReactDOM.createPortal(dropdownContent, document.body)}
    </div>
  );
};

export default DropdownMenu;
