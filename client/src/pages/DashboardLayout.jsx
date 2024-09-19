import React, { useContext, useState } from "react";
import { createContext } from "react";
import { Navbar, SideBar } from "../components";
import { Outlet, useNavigate } from "react-router-dom";
const DashboardContext = createContext();
export const useDashboardContext = () => useContext(DashboardContext);

const user = {
  user_name: "Saran",
  location: "coimbatore",
  coordinates: [11.0168, 76.9558],
};

localStorage.setItem("user", JSON.stringify(user));
const Dashboard = () => {
  const [isOpenSidebar,setIsOpenSidebar] = useState(false)
  const navigate =  useNavigate();
  const user = {
    name:'saran',
    city:"coimbatore",
  };

  

  const logoutUser = ()=>{
    navigate('/');
  }
  return (
    <DashboardContext.Provider value={{ user, logoutUser,setIsOpenSidebar,isOpenSidebar}}>
      <Navbar />
      {
        <div className="mt-[100px]">
          <Outlet />
        </div>
      }
      {isOpenSidebar && <SideBar />}
    </DashboardContext.Provider>
  );
};


export default Dashboard;
