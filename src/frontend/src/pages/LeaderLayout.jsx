import React, { useState, useContext } from "react";
import { Outlet } from "react-router";
import LeaderSideBar from "@/myComponents/LeaderSideBar";
import TopNavbar from "../myComponents/TopBar";
import RealTime from "../myComponents/RealTime";
import Breadcrumb from "../myComponents/Breadcrumb";
import AuthContext from "@/context/AuthContext";

const LeaderLayout = () => {
    const [sideBarOpen, setSideBarOpen] = useState(false);
    const { name } = useContext(AuthContext);
    return (
        <div className="flex bg-web3-dark mesh-bg relative md:static min-h-screen">
            <LeaderSideBar sideBarStatus={sideBarOpen} toggleSideBar={setSideBarOpen} />
            <div className="flex-1 h-screen overflow-y-auto">
                <TopNavbar sideBarStatus={sideBarOpen} toggleSideBar={setSideBarOpen} />
                <div className="p-4 flex justify-between items-center border-b border-white/[0.06]">
                    <Breadcrumb />
                    <div className="hidden sm:flex flex-col items-end">
                        <h1 className="font-semibold text-white/80 text-sm"><RealTime /></h1>
                        <p className="text-white/40 text-xs flex items-center gap-1.5 mt-0.5">
                            <span className="w-2 h-2 bg-web3-green rounded-full animate-pulse-slow" />
                            {name}
                        </p>
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default LeaderLayout;
