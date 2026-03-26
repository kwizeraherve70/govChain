import React, { useState, useContext, useEffect } from "react";
import DashCard from "../myComponents/DashCard";
import Chart from "../myComponents/Chart";
import BarChart from "../myComponents/BarChart";
import TransactionTable from "../myComponents/TransactionTable";
import AuthContext from "@/context/AuthContext";

const CitizenDashboard = () => {
    const [programsCount, setProgramsCount] = useState(0);
    const [stocksCount, setStocksCount] = useState(0);
    const [transactionsCount, setTransactionsCount] = useState(0);
    const { principalId } = useContext(AuthContext);

    useEffect(() => {
        // Fetch citizen programs count
        const fetchProgramsData = async () => {
            try {
                // This would typically call your backend to get citizen-specific programs
                setProgramsCount(0);
            } catch (error) {
                console.error("Error fetching programs:", error);
            }
        };

        // Fetch citizen stocks/materials count
        const fetchStocksData = async () => {
            try {
                // This would typically call your backend to get citizen-specific stocks
                setStocksCount(0);
            } catch (error) {
                console.error("Error fetching stocks:", error);
            }
        };

        // Fetch transactions count
        const fetchTransactionsData = async () => {
            try {
                // This would typically call your backend to get citizen transactions
                setTransactionsCount(0);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

        if (principalId) {
            fetchProgramsData();
            fetchStocksData();
            fetchTransactionsData();
        }
    }, [principalId]);

    return (
        <>
            <h1 className="text-5xl p-4 font-bold text-gray-800 dark:text-white">
                Dashboard
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-[95%] mx-auto mb-3">
                <DashCard name="Active Programs" account={programsCount} />
                <DashCard name="Pending Materials" account={stocksCount} />
                <DashCard name="Total Transactions" account={transactionsCount} />
            </div>
            <div className="w-[95%] mx-auto">
                <div className="grid grid-cols-12 gap-6">
                    <Chart />
                    <BarChart />
                    <TransactionTable />
                </div>
            </div>
        </>
    );
};

export default CitizenDashboard;
