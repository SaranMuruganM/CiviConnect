import React, { useContext, useState } from "react";
import Logo from "../assets/logo3.png";
import { useDashboardContext } from "../pages/DashboardLayout";
import { motion } from "framer-motion";
import LogoutContainer from "./LogoutContainer";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";

const Navbar = ({ motionVarient }) => {
  const context = useDashboardContext();

  return (
    <div className="h-[80px] fixed inset-0 border py-4 flex items-center justify-between lg:px-8 px-4 lg:pr-16 z-[999]">
      <div className="flex items-center gap-12">
        {context?.user && (context?.isOpenSidebar ? (
          <motion.div whileTap={{ opacity: 0.5, scale: 0.5 }}>
            <IoCloseOutline
              size={35}
              className="text-custom-darkBlue cursor-pointer"
              onClick={() => context?.setIsOpenSidebar(!context?.isOpenSidebar)}
              
            />
          </motion.div>
        ) : (
          <motion.div whileTap={{ opacity: 0.5, scale: 0.5 }}>
            <RxHamburgerMenu
              size={30}
              className="text-custom-darkBlue cursor-pointer" 
              onClick={() => context?.setIsOpenSidebar(!context?.isOpenSidebar)}
            />
          </motion.div>
        ))}
        <motion.img
          src={Logo}
          varients={{ motionVarient }}
          alt="logo"
          className="h-full md:w-[200px] w-[150px]"
        />
      </div>
      {context?.user && <LogoutContainer />}
    </div>
  );
};

export default Navbar;
