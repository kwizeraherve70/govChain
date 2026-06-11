import React  from "react";
import { useLocation, Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import RequestedTable from "@/myComponents/Tables/RequestTable";

const RequestPage=()=> {
    const { pathname } = useLocation();
    const backPath = pathname.startsWith("/Leader") ? "/Leader/Programs" : "/Admin/Programs";

    return(
        <>
		<div className="px-5 pt-5 pb-2">
			<Link
				to={backPath}
				className="inline-flex items-center gap-1.5 text-white/40 hover:text-white text-sm mb-3 transition-colors no-underline"
			>
				<IoArrowBack size={16} />
				Back to Programs
			</Link>
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