import React from "react";
import LeaderStockTable from "@/myComponents/Tables/LeaderStockTable";

const LeaderStock=()=> {
    return(
        <>
		<h1 className="text-5xl p-4 font-bold text-gray-800 dark:text-white">
				My Stock
			</h1>
            <div className="w-[95%]  mx-auto">
			<LeaderStockTable/>
            </div>
			</>
			
		
    )
}

export default LeaderStock