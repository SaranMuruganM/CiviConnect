import React from "react";
import { useDashboardContext } from "../pages/DashboardLayout";
import { useState } from "react";
import { IoMdArrowDropdownCircle } from "react-icons/io";
const LogoutContainer = () => {
  const { logoutUser, user } = useDashboardContext();
  const [showDropdown, isShowDropdown] = useState(false);
  return (
    <div className="relative">
      <button
        className="bg-custom-darkBlue text-white rounded p-2 flex items-center gap-2"
        onClick={() => isShowDropdown(!showDropdown)}
      >
        {user.name} <IoMdArrowDropdownCircle size={20} />
      </button>
      {showDropdown && (
        <button
          className="absolute top-12 bg-custom-darkBlue text-white p-2 rounded min-w-full"
          onClick={() => logoutUser()}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default LogoutContainer;
