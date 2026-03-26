import React , {useEffect} from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AllTransactionsThunk } from '@/Redux/action/AllTransaction';
import TableSkeleton from './skeletors/tableSkeletor';



// Columns Definition
const columns = [
  { field: 'TransactionId', headerName: 'Transaction ID', flex: 1 },
  { field: 'StockId', headerName: 'Stock ID', flex: 1 },
  { field: 'SenderId', headerName: 'Sender ID', flex: 1 },
  { field: 'ReceiverId', headerName: 'Receiver ID', flex: 1 },
  { field: 'Quantity', headerName: 'Quantity', type: 'number', flex: 1 },
  { field: 'TransactionType', headerName: 'Transaction Type', flex: 1 },
  {
    field: 'Status',
    headerName: 'Status',
    flex: 1,
    renderCell: (params) => {
      const statusColors = {
        ACCEPTED: 'green',
        REJECT: 'orange',
        PENDING: 'red',
      };
      return (
        <Box
          component="span"
          sx={{
            color: statusColors[params.value],
            fontWeight: 'bold',
          }}
        >
          {params.value}
        </Box>
      );
    },
  },
];

const TransactionTable = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
   dispatch(AllTransactionsThunk())
  },[dispatch])

  const {load, AllTransactions,error } = useSelector((state)=>state.AllTransactions)
  return (
    <div className="col-span-full">

<Box sx={{ height: 400, width: '100%', backgroundColor: 'white', p: 2, boxShadow: 2 }}>
      <h2>Transaction Table</h2>
      {load?
     (<div style={{textAlign: "center"}}>
      <TableSkeleton />
   </div>):  
   (AllTransactions?.length  === 0|| error)?(
    <div style={{textAlign: "center"}}>
          <p>No Program or there is error! Reload</p>
    </div>
  ):(
      <DataGrid
          getRowId={(row)=>(row.TransactionId)}
          rows={AllTransactions}
          columns={columns}
          slots={{
            toolbar: GridToolbar,
          }}
          sx={{
            backgroundColor: '#f5f5f5', // Light gray background
            '& .MuiDataGrid-row': {
              backgroundColor: '#ffffff', // White row background
              '&:nth-of-type(odd)': {
                backgroundColor: '#f9f9f9', // Alternate row color
              },
            },
            boxShadow: '0 4px 10px rgba(200, 200, 200, 0.7)',
            borderRadius: '8px',
            border: '1px solid #ddd',
          }}
        />
      )} 
    </Box>
    </div>
  );
};

export default TransactionTable;
