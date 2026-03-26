import React, {useEffect, useMemo} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { GetAllProgramThunk } from '../Redux/action/GetAllProgram';
import TableSkeleton from "./skeletors/tableSkeletor";


const ProgramDashTable=({setStats2})=>{
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(GetAllProgramThunk())
  }, [dispatch])
  const { loadingz,Allprogram,Errorz  } = useSelector((state)=> state.AllProgram)
  useMemo(()=>{
    setStats2(Allprogram)
},[Allprogram])
  return(
        <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Top Program</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-gray-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Program Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Leaders</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Citizens</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Beneficials</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
              {/* Row */}
              {loadingz ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    <TableSkeleton />
                  </td>
                </tr>
              ) : Allprogram?.length === 0 || Errorz ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    <p>No Users</p>
                  </td>
                </tr>
              ) :(
                Allprogram?.map((item)=>(
                  <tr>
                        <td className="p-2">
                          <div className="flex items-center">
                            <div className="text-gray-800 dark:text-gray-100">{item.Name}</div>
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-center">{item.LocalLeaders.length}</div>
                        </td>
                        <td className="p-2">
                          <div className="text-center text-green-500">{item.Citizens.length}</div>
                        </td>
                        <td className="p-2">
                          <div className="text-center">{item.Beneficials}</div>
                        </td>
                      </tr> 
             ))
              )}








              {/* {loadingz?
     (<div style={{textAlign: "center"}}>
      <TableSkeleton />
   </div>):  
   (Allprogram?.length  === 0|| Errorz)?(
    <div style={{textAlign: "center"}}>
          <p>No Users</p>
    </div>
  ):(
    Allprogram.map((item)=>(
          <tr>
                <td className="p-2">
                  <div className="flex items-center">
                    <div className="text-gray-800 dark:text-gray-100">{item.Name}</div>
                  </div>
                </td>
                <td className="p-2">
                  <div className="text-center">{item.LocalLeaders.length}</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-green-500">{item.Citizens.length}</div>
                </td>
                <td className="p-2">
                  <div className="text-center">{item.Beneficials}</div>
                </td>
              </tr> 
     ))

  )}  */}
   </tbody>
      </table>
    </div>
  </div>
</div>
    )

}

export default ProgramDashTable