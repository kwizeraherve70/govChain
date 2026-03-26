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
      backgroundColor: '#f5f5f5', 
      '& .MuiDataGrid-row': {
        backgroundColor: '#ffffff', 
        '&:nth-of-type(odd)': {
          backgroundColor: '#f9f9f9',
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

export default RequestedTable;
