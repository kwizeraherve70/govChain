import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashCard from "../myComponents/DashCard";
import Chart from "../myComponents/Chart";
import BarChart from "../myComponents/BarChart";
import { GetStoreThunk } from "@/Redux/action/MyStock";
import { MyTransactionsThunk } from "@/Redux/action/MyTransactions";
import { getProfile } from "@/utils/endpoints";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import TableSkeleton from "@/myComponents/skeletors/tableSkeletor";

const statusStyles = {
  ACCEPTED: { label: 'ACCEPTED', cls: 'badge-success' },
  REJECT:   { label: 'REJECTED', cls: 'badge-warning' },
  PENDING:  { label: 'PENDING',  cls: 'badge-danger'  },
};

const CitizenDashboard = () => {
    const dispatch = useDispatch();
    const [programsJoined, setProgramsJoined] = useState(0);

    const { GetStore }        = useSelector((state) => state.GetStore);
    const { load, MyTransactions, error } = useSelector((state) => state.MyTransactions);

    useEffect(() => {
        dispatch(GetStoreThunk());
        dispatch(MyTransactionsThunk());

        // Get the citizen's own profile to read ProgramsJoined
        getProfile().then((res) => {
            if (res.Ok) {
                setProgramsJoined(res.Ok.ProgramsJoined?.length || 0);
            }
        });
    }, [dispatch]);

    const rows = (MyTransactions || []).map((tx) => ({
        ...tx,
        StatusKey: tx.Status ? Object.keys(tx.Status)[0] : 'PENDING',
        TransactionType: tx.TransactionType ? Object.keys(tx.TransactionType)[0] : '',
    }));

    const columns = [
        { field: 'TransactionId', headerName: 'TX ID',    flex: 1, minWidth: 130 },
        { field: 'StockId',       headerName: 'Stock ID', flex: 1, minWidth: 110 },
        { field: 'SenderId',      headerName: 'Sender',   flex: 1, minWidth: 130 },
        { field: 'Quantity',      headerName: 'Qty', type: 'number', flex: 0.5, minWidth: 70 },
        { field: 'TransactionType', headerName: 'Type',   flex: 1, minWidth: 110 },
        {
            field: 'StatusKey',
            headerName: 'Status',
            flex: 1,
            minWidth: 110,
            renderCell: (params) => {
                const s = statusStyles[params.value] || { label: params.value, cls: 'badge-warning' };
                return <span className={s.cls}>{s.label}</span>;
            },
        },
    ];

    return (
        <div className="p-5 space-y-6">
            <div>
                <h1 className="text-3xl font-extrabold gradient-text">Dashboard</h1>
                <p className="text-white/40 text-sm mt-1">Citizen overview · Your on-chain activity</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <DashCard name="Programs Enrolled"   account={programsJoined}              index={0} />
                <DashCard name="Materials Received"  account={GetStore?.length || 0}       index={1} />
                <DashCard name="My Transactions"     account={MyTransactions?.length || 0} index={2} />
            </div>

            <div className="grid grid-cols-12 gap-5">
                <Chart />
                <BarChart />

                {/* Personal transaction history */}
                <div className="col-span-full bg-white/[0.05] backdrop-blur-lg border border-white/[0.1] rounded-2xl shadow-card overflow-hidden">
                    <header className="px-5 py-4 border-b border-white/[0.08]">
                        <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                            My Transaction History
                        </h2>
                    </header>
                    <div className="p-4">
                        {load ? (
                            <div className="text-center py-8"><TableSkeleton /></div>
                        ) : !MyTransactions || MyTransactions.length === 0 || error ? (
                            <div className="text-center py-8 text-white/30">
                                No transactions yet — distributions will appear here once approved
                            </div>
                        ) : (
                            <DataGrid
                                getRowId={(row) => row.TransactionId}
                                rows={rows}
                                columns={columns}
                                slots={{ toolbar: GridToolbar }}
                                sx={{
                                    border: 'none',
                                    color: 'rgba(255,255,255,0.75)',
                                    fontFamily: 'inherit',
                                    '& .MuiDataGrid-columnHeaders': {
                                        backgroundColor: 'rgba(255,255,255,0.04)',
                                        color: 'rgba(255,255,255,0.5)',
                                        fontSize: '0.72rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em',
                                        borderBottom: '1px solid rgba(255,255,255,0.08)',
                                    },
                                    '& .MuiDataGrid-row': {
                                        backgroundColor: 'transparent',
                                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                                        '&:hover': { backgroundColor: 'rgba(255,255,255,0.03)' },
                                    },
                                    '& .MuiDataGrid-cell': { borderBottom: 'none', color: 'rgba(255,255,255,0.7)' },
                                    '& .MuiDataGrid-toolbarContainer': {
                                        padding: '8px 4px',
                                        '& .MuiButton-root': { color: 'rgba(124,58,237,0.85)', fontSize: '0.75rem' },
                                    },
                                    '& .MuiTablePagination-root': { color: 'rgba(255,255,255,0.5)' },
                                    '& .MuiIconButton-root': { color: 'rgba(255,255,255,0.4)' },
                                    '& .MuiDataGrid-footerContainer': { borderTop: '1px solid rgba(255,255,255,0.08)' },
                                    '& .MuiInputBase-root': { color: 'rgba(255,255,255,0.6)' },
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CitizenDashboard;
