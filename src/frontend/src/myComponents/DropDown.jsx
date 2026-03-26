import React, { useState } from 'react';
import { IoMdMore } from 'react-icons/io';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeRoleThunk } from '@/Redux/action/ChangeRole';

const DropdownMenu = ({ position,ProfileId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch()
  const toggleDropdown = () => {
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
      className="fixed z-50 w-32 bg-white dark:bg-gray-700 rounded-md shadow-lg"
    >
      <div className="py-1" role="menu" aria-orientation="vertical">
        <a href="#" onClick={()=>{RoleChanger("HIGH_OFFICIAL")}} className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600" role="menuitem">
          HIGH_OFFICIAL
        </a>
        <a href="#" onClick={()=>{RoleChanger("LOCAL_LEADER")}} className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600" role="menuitem">
          LOCAL_LEADER
        </a>
        <a href="#" onClick={()=>{RoleChanger("CITIZEN")}} className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600" role="menuitem">
          CITIZEN
        </a>
      </div>
    </div>
  );

  return (
    <div className="relative">
      <button
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
