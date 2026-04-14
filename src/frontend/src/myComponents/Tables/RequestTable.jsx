import React, { useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from '@mui/material';
import { useDispatch,useSelector} from "react-redux";
import TableSkeleton from '../skeletors/tableSkeletor';
import { ViewRequestThunk } from '@/Redux/action/ViewRequested';
import { Button } from '@/components/ui/button';
import ApproveAction from './ApproveAction';


const RequestedTable = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        navigate('/Profile');
      } else {
        await dispatch(ViewRequestThunk(id))
      }
    };
    fetchData();
  }, [dispatch, id, navigate]);
  const columns = [
    { field: 'ProfileId', headerName: 'Profile ID', width: 230 },
    { field: 'Fullname', headerName: 'Full name', width: 200 },
    { field: 'Gender', headerName: 'Gender', width:100 },
    { field: 'NationalId', headerName: 'NationalId', width: 180 },
    { field: 'Phone', headerName: 'Phone', width: 150 }, 
    { field: 'CreatedAt', headerName: 'Joined', width: 100 },
    {
      field:"Action",
      headerName: "Action",
      renderCell: (params)=>(
        <ApproveAction ProgramId={id} key={params.row.ProfileId} ProfileId={params.row.ProfileId}/>
      ),
      width: 150,
  }
  ];
  
 
  const {  load, ViewRequest, error} = useSelector((state)=>state.Viewrequest)
  return (
    <div className="col-span-full">

<Box sx={{ height: 400, width: '100%', backgroundColor: 'white', p: 2, boxShadow: 2 }}>
      <h2>Request Citizens</h2>
      {load?
     (<div style={{textAlign: "center"}}>
      <TableSkeleton />
   </div>):  
   (ViewRequest?.length  === 0|| error)?(
    <div style={{textAlign: "center"}}>
          <p>No One Requested</p>
    </div>
  ):(
    <DataGrid
    getRowId={(row)=>(row.ProfileId)}
    rows={ViewRequest}
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
      
      )} 
    </Box>
    </div>
  );
};

export default RequestedTable;
