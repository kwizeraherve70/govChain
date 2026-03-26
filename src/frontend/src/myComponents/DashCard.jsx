import React from "react"


const DashCard=({name,account})=>{
    return (
        <div className="flex flex-col bg-white  shadow-sm rounded-xl">
      <div className="p-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{name}</h2>   
        </header>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 dark:text-gray-100 mr-2">{account}</div>
        </div>
      </div>
    </div>
    )
}


export default DashCard
