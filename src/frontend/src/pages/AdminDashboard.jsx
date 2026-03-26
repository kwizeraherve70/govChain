import React, { useState } from "react";
import DashCard from "../myComponents/DashCard";
import Chart from "../myComponents/Chart";
import BarChart from "../myComponents/BarChart";
import DashTable from "../myComponents/DashTable";
import ProgramDashTable from "../myComponents/GramTable";
import TransactionTable from "../myComponents/TransactionTable";


const AdminDashboard=()=> {
    const  [ stats, setStats] = useState(null)
    const  [ stats2, setStats2] = useState(null)
    return(
        <>
		<h1 className="text-5xl p-4 font-bold text-gray-800 dark:text-white">
				Dashboard
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-[95%] mx-auto mb-3">
                <DashCard name="Total Users" account={stats?.length || 0}/>
				<DashCard  name="Total Programs" account={stats2?.length || 0}/>
				<DashCard name="Stock" account={0}/>
			</div>
            <div className="w-[95%]  mx-auto">
               <div className="grid grid-cols-12 gap-6">
                   <Chart/>
                   <DashTable setStats={setStats}/>
                   <BarChart/>
                   <ProgramDashTable setStats2={setStats2}/>
                   {/* <TransactionTable/>  */}

               </div>
            </div>
	</>
			
		
    )
}

export default AdminDashboard