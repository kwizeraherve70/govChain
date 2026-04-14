import React, { useEffect } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from 'react-redux';
import { AllTransactionsThunk } from '@/Redux/action/AllTransaction';
import TableSkeleton from './skeletors/tableSkeletor';

const statusStyles = {
  ACCEPTED: { label: 'ACCEPTED', cls: 'badge-success' },
  REJECT:   { label: 'REJECTED', cls: 'badge-warning' },
  PENDING:  { label: 'PENDING',  cls: 'badge-danger'  },
};

const columns = [
  { field: 'TransactionId', headerName: 'TX ID',            flex: 1, minWidth: 130 },
  { field: 'StockId',       headerName: 'Stock ID',         flex: 1, minWidth: 110 },
  { field: 'SenderId',      headerName: 'Sender',           flex: 1, minWidth: 130 },
  { field: 'ReceiverId',    headerName: 'Receiver',         flex: 1, minWidth: 130 },
  { field: 'Quantity',      headerName: 'Qty',  type: 'number', flex: 0.5, minWidth: 70 },
  { field: 'TransactionType', headerName: 'Type',           flex: 1, minWidth: 110 },
  {
    field: 'Status',
    headerName: 'Status',
    flex: 1,
    minWidth: 110,
    renderCell: (params) => {
      const s = statusStyles[params.value] || { label: params.value, cls: 'badge-warning' };
      return <span className={s.cls}>{s.label}</span>;
    },
  },
];

const TransactionTable = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(AllTransactionsThunk());
  }, [dispatch]);

  const { load, AllTransactions, error } = useSelector((state) => state.AllTransactions);

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
            rows={AllTransactions}
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
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.03)',
                },
              },
              '& .MuiDataGrid-cell': {
                borderBottom: 'none',
                color: 'rgba(255,255,255,0.7)',
              },
              '& .MuiDataGrid-toolbarContainer': {
                padding: '8px 4px',
                '& .MuiButton-root': {
                  color: 'rgba(124,58,237,0.85)',
                  fontSize: '0.75rem',
                },
              },
              '& .MuiTablePagination-root': {
                color: 'rgba(255,255,255,0.5)',
              },
              '& .MuiIconButton-root': {
                color: 'rgba(255,255,255,0.4)',
              },
              '& .MuiDataGrid-footerContainer': {
                borderTop: '1px solid rgba(255,255,255,0.08)',
              },
              '& .MuiInputBase-root': {
                color: 'rgba(255,255,255,0.6)',
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TransactionTable;
