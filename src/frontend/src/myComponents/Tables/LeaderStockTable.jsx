import React, {  useEffect } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";


// Form Get stock
import { useDispatch,useSelector} from "react-redux";
import TableSkeleton from "../skeletors/tableSkeletor";
import { GetStoreThunk } from "@/Redux/action/MyStock";
import DistributePop from "./DistributePop";



const LeaderStockTable = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(GetStoreThunk())
  },[dispatch])


  const columns = [
    { field: "StockId", headerName: "Stock Id", width: 100 },
    { field: "ProgramId", headerName: "Program Id", width: 150 },
    { field: "StockName", headerName: " Stock Name", width: 150 },
    {
      field: "Quantity",
      headerName: "Quantity",
      width: 150
    },
    {
      field: "Action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => (
        <DistributePop ProgramId={params.row.ProgramId} StockId={params.row.StockId} key={params.row.StockId} />
      ),
    },
   
   
  ];
    const  {  loading, GetStore, errorz } = useSelector((state)=>state.GetStore)
  return (
    <>
      <div className="flex justify-end mb-3 font-bold">
      </div>

      <Box
        sx={{
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            // Customize toolbar button styles
          },
        }}
      >
       {loading?
     (<div style={{textAlign: "center"}}>
      <TableSkeleton />
   </div>):  
   (GetStore?.length  === 0|| errorz)?(
    <div style={{textAlign: "center"}}>
          <p>No Stock or there is error! Reload</p>
    </div>
  ):(
    <DataGrid
    getRowId={(row)=>(row.StockId)}
    rows={GetStore}
    columns={columns}
    slots={{
      toolbar: GridToolbar,
    }}
    sx={{
          border: 'none',
          borderRadius: '12px',
          color: 'rgba(255,255,255,0.75)',
          fontFamily: 'inherit',
          backgroundColor: 'rgba(255,255,255,0.03)',
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
      )
      }
      </Box>
    </>
  );
};

export default LeaderStockTable;