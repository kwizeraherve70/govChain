import React , {useState} from "react";
import LeaderTable from "@/myComponents/Tables/LeaderTable";
import DashCard from "../myComponents/DashCard";





const LeaderProgram=()=> {
	const  [ stats, setStats] = useState(null)
    return(
        <>
		<h1 className="text-5xl p-4 font-bold text-gray-800 dark:text-white">
				Programs
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-[95%] mx-auto mb-3">
				<DashCard name="Total Programs" account={stats?.totalProgram.toString() || 0}/>
				<DashCard  name="Total Benefecials" account={stats?.totalBenefecials.toString() || 0}/>
				<DashCard name="Total Served" account={stats?.totalEnrolled.toString() || 0}/>
			</div>
            <div className="w-[95%]  mx-auto">
               <LeaderTable setStats={setStats}/>
            </div>
			</>
			
		
    )
}

export default LeaderProgram