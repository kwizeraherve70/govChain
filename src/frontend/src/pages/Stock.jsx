import React, { useEffect } from "react";
import DashCard from "../myComponents/DashCard";
import StockTable from "../myComponents/Tables/StockTable";
import { useSelector, useDispatch } from "react-redux";
import { GetAllStockThunk } from "../Redux/action/GetAllStock";

const Stock = () => {
	const dispatch = useDispatch();
	const { AllStock } = useSelector((state) => state.AllStocks);

	useEffect(() => {
		dispatch(GetAllStockThunk());
	}, [dispatch]);

	return (
		<>
			<div className="px-5 pt-5 pb-2">
				<h1 className="text-3xl font-extrabold gradient-text">Stock</h1>
				<p className="text-white/40 text-sm mt-1">Inventory & resource management</p>
			</div>

			{AllStock && AllStock.length > 0 && (
				<div className="w-[95%] mx-auto mb-3 space-y-5">
					{AllStock.map((stock) => (
						<div key={stock.StockId}>
							<p className="text-white/70 text-sm font-semibold mb-2 uppercase tracking-wide">
								{stock.StockName}
							</p>
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
								<DashCard name="Total Items" account="1" index={0} />
								<DashCard name="Total Quantity" account={stock.Quantity.toString()} index={1} />
								<DashCard name="Total Remain" account={stock.RemainingStock.toString()} index={2} />
							</div>
						</div>
					))}
				</div>
			)}

			<div className="w-[95%] mx-auto">
				<StockTable />
			</div>
		</>
	);
};

export default Stock;
