import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProfileThunk } from "../Redux/action/GetAllProfile";
import TableSkeleton from "./skeletors/tableSkeletor";

const roleColors = {
  HIGH_OFFICIAL: 'text-web3-accent',
  LOCAL_LEADER:  'text-web3-purple',
  CITIZEN:       'text-web3-glow',
};

const DashTable = ({ setStats }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllProfileThunk());
  }, [dispatch]);

  const { loading, GetAllProfile, error } = useSelector((state) => state.AllProfile);
  useMemo(() => {
    setStats(GetAllProfile);
  }, [GetAllProfile]);

  return (
    <div className="col-span-full xl:col-span-8
                    bg-white/[0.05] backdrop-blur-lg border border-white/[0.1]
                    rounded-2xl shadow-card overflow-hidden">
      <header className="px-5 py-4 border-b border-white/[0.08] flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
          Recent Users
        </h2>
        <span className="text-xs text-white/30">{GetAllProfile?.length || 0} total</span>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="px-5 py-3 text-left text-xs font-semibold text-white/40 uppercase tracking-wider">
                Full Name
              </th>
              <th className="px-5 py-3 text-center text-xs font-semibold text-white/40 uppercase tracking-wider">
                Email
              </th>
              <th className="px-5 py-3 text-center text-xs font-semibold text-white/40 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-5 py-3 text-center text-xs font-semibold text-white/40 uppercase tracking-wider">
                Role
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {loading ? (
              <tr>
                <td colSpan="4" className="text-center py-8">
                  <TableSkeleton />
                </td>
              </tr>
            ) : GetAllProfile?.length === 0 || error ? (
              <tr>
                <td colSpan="4" className="text-center py-8 text-white/30">
                  No users found
                </td>
              </tr>
            ) : (
              GetAllProfile?.map((item) => (
                <tr key={item.ProfileId}
                    className="hover:bg-white/[0.03] transition-colors duration-150">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-web3-accent to-web3-purple
                                      flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                        {item.Fullname?.charAt(0)?.toUpperCase()}
                      </div>
                      <span className="text-white/80 font-medium">{item.Fullname}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-center text-white/55">{item.Email}</td>
                  <td className="px-5 py-3.5 text-center text-web3-glow">{item.Phone}</td>
                  <td className="px-5 py-3.5 text-center">
                    <span className={`text-xs font-semibold ${roleColors[Object.keys(item.Role)[0]] || 'text-white/60'}`}>
                      {Object.keys(item.Role)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashTable;
