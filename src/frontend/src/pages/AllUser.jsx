import React  from "react";
import Table from "../myComponents/Table";
import DashCard from "../myComponents/DashCard";
import AllProfileTable from "@/myComponents/Tables/AllProfileTable";





const Users=()=> {
    return(
        <>
		<div className="px-5 pt-5 pb-2">
			<h1 className="text-3xl font-extrabold gradient-text">Users</h1>
			<p className="text-white/40 text-sm mt-1">Registered system participants</p>
		</div>
            <div className="w-[95%]  mx-auto">
               <AllProfileTable/>
			 
            </div>
			</>
			
		
    )
}

export default Users