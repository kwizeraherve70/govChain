import React ,{useState} from "react";
import DashCard from "../myComponents/DashCard";
import StockTable from "../myComponents/Tables/StockTable";

const Stock=()=> {
	const [StockStat,setStockStats] = useState(null)
    return(
        <>
		<div className="px-5 pt-5 pb-2">
			<h1 className="text-3xl font-extrabold gradient-text">Stock</h1>
			<p className="text-white/40 text-sm mt-1">Inventory & resource management</p>
		</div>
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-[95%] mx-auto mb-3">
				<DashCard name="Total Items" account={StockStat?.totalStock.toString() || 0}/>
				<DashCard  name="Total Quantity" account={StockStat?.totalQuantity.toString() || 0}/>
				<DashCard name="Total Remain" account={StockStat?.totalRemaining.toString() || 0}/>
			</div>
            <div className="w-[95%]  mx-auto">
			<StockTable setStockStats={setStockStats}/>
			 
            </div>
			</>
			
		
    )
}

export default Stock