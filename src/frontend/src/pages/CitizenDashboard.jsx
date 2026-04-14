import React, { useState, useEffect } from "react";
import DashCard from "../myComponents/DashCard";
import Chart from "../myComponents/Chart";
import BarChart from "../myComponents/BarChart";
import TransactionTable from "../myComponents/TransactionTable";
const CitizenDashboard = () => {
    const [programsCount,     setProgramsCount]     = useState(0);
    const [stocksCount,       setStocksCount]       = useState(0);
    const [transactionsCount, setTransactionsCount] = useState(0);
    useEffect(() => {
        const fetchProgramsData = async () => {
            try { setProgramsCount(0); }
            catch (error) { console.error("Error fetching programs:", error); }
        };
        const fetchStocksData = async () => {
            try { setStocksCount(0); }
            catch (error) { console.error("Error fetching stocks:", error); }
        };
        const fetchTransactionsData = async () => {
            try { setTransactionsCount(0); }
            catch (error) { console.error("Error fetching transactions:", error); }
        };

        fetchProgramsData();
        fetchStocksData();
        fetchTransactionsData();
    }, []);

    return (
        <div className="p-5 space-y-6">
            {/* Page header */}
            <div>
                <h1 className="text-3xl font-extrabold gradient-text">Dashboard</h1>
                <p className="text-white/40 text-sm mt-1">Citizen overview · Your on-chain activity</p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <DashCard name="Active Programs"     account={programsCount}     index={0} />
                <DashCard name="Pending Materials"   account={stocksCount}       index={1} />
                <DashCard name="Total Transactions"  account={transactionsCount} index={2} />
            </div>

            {/* Charts & tables */}
            <div className="grid grid-cols-12 gap-5">
                <Chart />
                <BarChart />
                <TransactionTable />
            </div>
        </div>
    );
};

export default CitizenDashboard;
