import React  from "react";
import Table from "../myComponents/Table";
import DashCard from "../myComponents/DashCard";
import AllProfileTable from "@/myComponents/Tables/AllProfileTable";





const Users=()=> {
    return(
        <>
		<h1 className="text-5xl p-4 font-bold text-gray-800 dark:text-white">
				Users
			</h1>
            <div className="w-[95%]  mx-auto">
               <AllProfileTable/>
			 
            </div>
			</>
			
		
    )
}

export default Users