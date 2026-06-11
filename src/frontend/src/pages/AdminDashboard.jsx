import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashCard from "../myComponents/DashCard";
import Chart from "../myComponents/Chart";
import BarChart from "../myComponents/BarChart";
import DashTable from "../myComponents/DashTable";
import ProgramDashTable from "../myComponents/GramTable";
import { GetAllStockThunk } from "@/Redux/action/GetAllStock";

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const [stats,  setStats]  = useState(null);
    const [stats2, setStats2] = useState(null);

    useEffect(() => {
        dispatch(GetAllStockThunk());
    }, [dispatch]);

    const { AllStock } = useSelector((state) => state.AllStocks);

    return (
        <div className="p-5 space-y-6">
            {/* Page header */}
            <div>
                <h1 className="text-3xl font-extrabold gradient-text">Dashboard</h1>
                <p className="text-white/40 text-sm mt-1">Admin overview · On-chain data</p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <DashCard name="Total Users"    account={stats?.length || 0}    index={0} />
                <DashCard name="Total Programs" account={stats2?.length || 0}   index={1} />
                <DashCard name="Stock Items"    account={AllStock?.length || 0} index={2} />
            </div>

            {/* Charts & tables */}
            <div className="grid grid-cols-12 gap-5">
                <Chart />
                <DashTable setStats={setStats} />
                <BarChart />
                <ProgramDashTable setStats2={setStats2} />
            </div>
        </div>
    );
};

export default AdminDashboard;
