import React from "react";
import Logo from "../assets/logo3.png";
import { useDashboardContext } from "../pages/DashboardLayout";
import { motion } from "framer-motion";
import LogoutContainer from "./LogoutContainer";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";

const Navbar = ({ motionVarient }) => {
  const context = useDashboardContext();

  return (
    <div className="h-[80px] fixed inset-0 border py-4 flex items-center justify-between lg:px-8 px-4 lg:pr-16 z-[999] bg-white">
      <div className="flex items-center gap-12">
        {context?.user && (
          <motion.div
            whileTap={{ opacity: 0.5, scale: 0.5 }}
            className="cursor-pointer" 
            onClick={() => context?.setIsOpenSidebar(!context?.isOpenSidebar)}
          >
            {context?.isOpenSidebar ? (
              <IoCloseOutline size={35} className="text-custom-darkBlue" />
            ) : (
              <RxHamburgerMenu size={30} className="text-custom-darkBlue" />
            )}
          </motion.div>
        )}
        <motion.img
          src={Logo}
          variants={{ motionVarient }}
          alt="logo"
          className="h-full md:w-[200px] w-[150px]"
        />
      </div>
      {context?.user && <LogoutContainer />}
    </div>
  );
};

export default Navbar;
