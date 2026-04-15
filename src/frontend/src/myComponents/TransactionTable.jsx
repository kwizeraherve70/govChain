import React, { useContext, useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from 'react-redux';
import { AllTransactionsThunk } from '@/Redux/action/AllTransaction';
import { ApproveTransactionThunk } from '@/Redux/action/ApproveTransaction';
import { RejectTransactionThunk } from '@/Redux/action/RejectTransaction';
import TableSkeleton from './skeletors/tableSkeletor';
import AuthContext from '@/context/AuthContext';
import { BeatLoader } from 'react-spinners';

const statusStyles = {
  ACCEPTED: { label: 'ACCEPTED', cls: 'badge-success' },
  REJECT:   { label: 'REJECTED', cls: 'badge-warning' },
  PENDING:  { label: 'PENDING',  cls: 'badge-danger'  },
};

const TransactionTable = () => {
  const dispatch = useDispatch();
  const { Role } = useContext(AuthContext);
  const [actionState, setActionState] = useState({});

  useEffect(() => {
    dispatch(AllTransactionsThunk());
  }, [dispatch]);

  const { load, AllTransactions, error } = useSelector((state) => state.AllTransactions);

  const canApprove = Role && (Role.includes('HIGH_OFFICIAL') || Role.includes('LOCAL_LEADER'));

  const getStatusKey = (status) => {
    if (!status) return 'PENDING';
    if (typeof status === 'string') return status;
    return Object.keys(status)[0] || 'PENDING';
  };

  const handleApprove = async (txId) => {
    setActionState((prev) => ({ ...prev, [txId]: 'approving' }));
    await dispatch(ApproveTransactionThunk(txId));
    await dispatch(AllTransactionsThunk());
    setActionState((prev) => { const s = { ...prev }; delete s[txId]; return s; });
  };

  const handleReject = async (txId) => {
    setActionState((prev) => ({ ...prev, [txId]: 'rejecting' }));
    await dispatch(RejectTransactionThunk(txId));
    await dispatch(AllTransactionsThunk());
    setActionState((prev) => { const s = { ...prev }; delete s[txId]; return s; });
  };

  const rows = (AllTransactions || []).map((tx) => ({
    ...tx,
    StatusKey: getStatusKey(tx.Status),
    TransactionType: tx.TransactionType ? Object.keys(tx.TransactionType)[0] : '',
  }));

  const columns = [
    { field: 'TransactionId', headerName: 'TX ID',    flex: 1, minWidth: 130 },
    { field: 'StockId',       headerName: 'Stock ID', flex: 1, minWidth: 110 },
    { field: 'SenderId',      headerName: 'Sender',   flex: 1, minWidth: 130 },
    { field: 'ReceiverId',    headerName: 'Receiver', flex: 1, minWidth: 130 },
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
    ...(canApprove ? [{
      field: 'Actions',
      headerName: 'Actions',
      minWidth: 160,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        if (params.row.StatusKey !== 'PENDING') return null;
        const state = actionState[params.row.TransactionId];
        return (
          <div className="flex gap-1 items-center h-full">
            <button
              onClick={() => handleApprove(params.row.TransactionId)}
              disabled={!!state}
              className="px-2 py-0.5 rounded-full text-xs font-semibold bg-web3-green/20 text-web3-green border border-web3-green/40 hover:bg-web3-green/40 disabled:opacity-50"
            >
              {state === 'approving' ? <BeatLoader size={6} color="#10b981" /> : 'Approve'}
            </button>
            <button
              onClick={() => handleReject(params.row.TransactionId)}
              disabled={!!state}
              className="px-2 py-0.5 rounded-full text-xs font-semibold bg-web3-pink/20 text-web3-pink border border-web3-pink/40 hover:bg-web3-pink/40 disabled:opacity-50"
            >
              {state === 'rejecting' ? <BeatLoader size={6} color="#f72585" /> : 'Reject'}
            </button>
          </div>
        );
      },
    }] : []),
  ];

  return (
    <div className="col-span-full
                    bg-white/[0.05] backdrop-blur-lg border border-white/[0.1]
                    rounded-2xl shadow-card overflow-hidden">
      <header className="px-5 py-4 border-b border-white/[0.08]">
        <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
          Transaction History
        </h2>
      </header>

      <div className="p-4">
        {load ? (
          <div className="text-center py-8"><TableSkeleton /></div>
        ) : AllTransactions?.length === 0 || error ? (
          <div className="text-center py-8 text-white/30">
            No transactions found — reload to refresh
          </div>
        ) : (
          <DataGrid
            getRowId={(row) => row.TransactionId}
            rows={rows}
            columns={columns}
            autoHeight
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
  );
};

export default TransactionTable;
