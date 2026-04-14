import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { GetAllProgramThunk } from '../Redux/action/GetAllProgram';
import TableSkeleton from "./skeletors/tableSkeletor";

const ProgramDashTable = ({ setStats2 }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllProgramThunk());
  }, [dispatch]);

  const { loadingz, Allprogram, Errorz } = useSelector((state) => state.AllProgram);
  useMemo(() => {
    setStats2(Allprogram);
  }, [Allprogram]);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4
                    bg-white/[0.05] backdrop-blur-lg border border-white/[0.1]
                    rounded-2xl shadow-card overflow-hidden">
      <header className="px-5 py-4 border-b border-white/[0.08] flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
          Top Programs
        </h2>
        <span className="text-xs text-white/30">{Allprogram?.length || 0} total</span>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="px-4 py-3 text-left text-xs font-semibold text-white/40 uppercase tracking-wider">
                Program
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-white/40 uppercase tracking-wider">
                Leaders
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-white/40 uppercase tracking-wider">
                Citizens
              </th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-white/40 uppercase tracking-wider">
                Beneficials
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {loadingz ? (
              <tr>
                <td colSpan="4" className="text-center py-8">
                  <TableSkeleton />
                </td>
              </tr>
            ) : Allprogram?.length === 0 || Errorz ? (
              <tr>
                <td colSpan="4" className="text-center py-8 text-white/30">
                  No programs found
                </td>
              </tr>
            ) : (
              Allprogram?.map((item) => (
                <tr key={item.ProgramId}
                    className="hover:bg-white/[0.03] transition-colors duration-150">
                  <td className="px-4 py-3.5">
                    <span className="text-white/80 font-medium">{item.Name}</span>
                  </td>
                  <td className="px-4 py-3.5 text-center text-web3-accent font-medium">
                    {item.LocalLeaders.length}
                  </td>
                  <td className="px-4 py-3.5 text-center text-web3-glow font-medium">
                    {item.Citizens.length}
                  </td>
                  <td className="px-4 py-3.5 text-center text-web3-green font-medium">
                    {item.Beneficials}
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

export default ProgramDashTable;
