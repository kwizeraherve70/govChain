import React , {useState} from "react";
import Table from "../myComponents/Table";
import DashCard from "../myComponents/DashCard";





const Program=()=> {
	const  [ stats, setStats] = useState(null)
	
    return(
        <>
		<div className="px-5 pt-5 pb-2">
			<h1 className="text-3xl font-extrabold gradient-text">Programs</h1>
			<p className="text-white/40 text-sm mt-1">Government aid & development programs</p>
		</div>
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-[95%] mx-auto mb-3">
				<DashCard name="Total Programs" account={stats?.totalProgram.toString() || 0}/>
				<DashCard  name="Total Benefecials" account={stats?.totalBenefecials.toString() || 0}/>
				<DashCard name="Total Served" account={stats?.totalEnrolled.toString() || 0}/>
			</div>
            <div className="w-[95%]  mx-auto">
               <Table setStats={setStats}/>
			 
            </div>
			</>
			
		
    )
}

export default Program