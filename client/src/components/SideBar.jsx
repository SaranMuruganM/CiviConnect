import React from 'react'
import {Link} from 'react-router-dom'
import { useDashboardContext } from '../pages/DashboardLayout';
const SideBar = () => {
  const {setIsSidebarOpen,isSidebarOpen} = useDashboardContext();
  return (
    <div className="w-[200px] fixed bg-custom-blue top-[80px] bottom-0 z-50 flex items-center justify-center">
      <div className="grid w-full gap-8 px-4 text-center *:py-1 text-md *:border-b-[0.125px] *:text-white *:cursor-pointer pt-10 *:border-custom-darkBlue">
        <Link
          to={"/dashboard"}
          className="hover:pl-4 "
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          City Insights
        </Link>
        <Link
          to={"mapview"}
          className="hover:pl-4"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          Issue Map
        </Link>
        <Link
          to={"report"}
          className="hover:pl-4"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          New Report
        </Link>
        <Link
          to={"Issues"}
          className="hover:pl-4"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          Reported Issues
        </Link>
        <Link
          to={"mission"}
          className="hover:pl-4"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          Our Mission
        </Link>
      </div>
    </div>
  );
}

export default SideBar