import TransactionTable from "@/myComponents/TransactionTable";
import React from "react";


const Transaction=()=>{
  return(
   <>
  <div className="px-5 pt-5 pb-2">
    <h1 className="text-3xl font-extrabold gradient-text">All Transactions</h1>
    <p className="text-white/40 text-sm mt-1">On-chain transaction records</p>
  </div>
  <div className="w-[95%] mx-auto pb-5">
       <TransactionTable/>
    </div>
</>
  )
}

export default Transaction