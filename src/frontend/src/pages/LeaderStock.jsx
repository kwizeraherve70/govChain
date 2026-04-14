import React from "react";
import LeaderStockTable from "@/myComponents/Tables/LeaderStockTable";

const LeaderStock=()=> {
    return(
        <>
		<div className="px-5 pt-5 pb-2">
			<h1 className="text-3xl font-extrabold gradient-text">My Stock</h1>
			<p className="text-white/40 text-sm mt-1">Allocated resources & materials</p>
		</div>
            <div className="w-[95%]  mx-auto">
			<LeaderStockTable/>
            </div>
			</>
			
		
    )
}

export default LeaderStock