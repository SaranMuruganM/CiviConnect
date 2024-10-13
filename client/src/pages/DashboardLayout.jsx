import React, { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { Navbar, SideBar } from '../components';
import { Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const DashboardContext = createContext();
export const useDashboardContext = () => useContext(DashboardContext);

const Dashboard = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = Cookies.get('userData');
    const userData = data ? JSON.parse(data) : null;
    setUser(userData);
  }, []);

  const logoutUser = () => {
    Cookies.remove('userData');
    navigate('/'); 
  };

  return (
    <DashboardContext.Provider
      value={{ user, logoutUser, setIsOpenSidebar, isOpenSidebar }}
    >
      <Navbar />
      <div className="mt-[100px]">
        <Outlet />
      </div>
      {isOpenSidebar && <SideBar />}
    </DashboardContext.Provider>
  );
};

export default Dashboard;
