import React  from "react";
import RequestedTable from "@/myComponents/Tables/RequestTable";

const RequestPage=()=> {
    return(
        <>
		<h1 className="text-5xl p-4 font-bold text-gray-800 dark:text-white">
				Request Citizens
			</h1>
            <div className="w-[95%]  mx-auto">
            <RequestedTable />
			 
            </div>
			</>
			
		
    )
}

export default RequestPage