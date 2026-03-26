import TransactionTable from "@/myComponents/TransactionTable";
import React from "react";


const Transaction=()=>{
  return(
   <>
  <h1 className="text-5xl p-4 font-bold text-gray-800 dark:text-white">
      All Transaction
   </h1>
   <div className="w-[95%]  mx-auto">
       <TransactionTable/>
    </div>
</>
  )
}

export default Transaction