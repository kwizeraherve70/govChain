import React  from "react";
import RequestedTable from "@/myComponents/Tables/RequestTable";

const RequestPage=()=> {
    return(
        <>
		<div className="px-5 pt-5 pb-2">
			<h1 className="text-3xl font-extrabold gradient-text">Citizen Requests</h1>
			<p className="text-white/40 text-sm mt-1">Pending enrollment requests</p>
		</div>
            <div className="w-[95%]  mx-auto">
            <RequestedTable />
			 
            </div>
			</>
			
		
    )
}

export default RequestPage