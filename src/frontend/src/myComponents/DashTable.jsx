import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProfileThunk } from "../Redux/action/GetAllProfile";
import TableSkeleton from "./skeletors/tableSkeletor";

const DashTable = ({setStats}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllProfileThunk());
  }, [dispatch]);

  const { loading, GetAllProfile, error } = useSelector((state) => state.AllProfile);
  useMemo(()=>{
    setStats(GetAllProfile)
},[GetAllProfile])
  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">New Users</h2>
      </header>
      <div className="p-3">
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-gray-300">
            <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Full-Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Email</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Phone</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Role</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
              {loading ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    <TableSkeleton />
                  </td>
                </tr>
              ) : GetAllProfile?.length === 0 || error ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    <p>No Users</p>
                  </td>
                </tr>
              ) : (
                GetAllProfile?.map((item) => (
                  <tr key={item.ProfileId}>
                    <td className="p-2">
                      <div className="flex items-center">
                        <div className="text-gray-800 dark:text-gray-100">{item.Fullname}</div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">{item.Email}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-green-500">{item.Phone}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-sky-500">{Object.keys(item.Role)}</div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashTable;
