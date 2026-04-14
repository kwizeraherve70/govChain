import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

// Form submission
import { useDispatch,useSelector} from "react-redux";
import TableSkeleton from "../skeletors/tableSkeletor";
import { GetAllProgramThunk } from "../../Redux/action/GetAllProgram";
import RequestAction from "./RequestAction";


const CitizensProgramTable = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(GetAllProgramThunk())
  },[dispatch])

  const columns = [
    
    { field: "ProgramId", headerName: "ID", width: 100},
    { field: "Name", headerName: "Program Name", width: 150 },
    {
      field: "LocalLeaders",
      headerName: "Local Leaders",
      width: 150,
      renderCell: (params)=> (
        params.row.LocalLeaders.length
      )
    },
    {
      field: "RequestCitizens",
      headerName: "Requests",
      width: 150,
      renderCell: (params) => (params.row.RequestCitizens.length),
    },
    { 
      field: "Citizens", 
      headerName: "Citizens", 
      width: 150,
      renderCell: (params)=> (
        params.row.Citizens.length
      )
    },
    { field: "Beneficials", headerName: "Beneficials", width: 150, 
      },
    { field: "Description", headerName: "Description", width: 150 },
    { field: "CreatedAt", headerName: "CreatedAt", width: 150 },
    { 
      field: "Action", 
      headerName: "Action", 
      width: 150 ,
      renderCell: (params)=> (
         <RequestAction data={params.row.ProgramId} key={params.row.ProgramId}/>
      )
    },
  ];
 
    const { loadingz,Allprogram,Errorz  } = useSelector((state)=> state.AllProgram)
  return (
    <>

		<h1 className="text-5xl p-4 font-bold text-gray-800 dark:text-white">
				Programs
			</h1>
            <div className="w-[95%]  mx-auto">
            <Box
        sx={{
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            // Customize toolbar button styles
          },
        }}
      >
        {loadingz?
     (<div style={{textAlign: "center"}}>
      <TableSkeleton />
   </div>):  
   (Allprogram?.length  === 0|| Errorz)?(
    <div style={{textAlign: "center"}}>
          <p>No Program or there is error! Reload</p>
    </div>
  ):(
      <DataGrid
          getRowId={(row)=>(row.ProgramId)}
          rows={Allprogram}
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
</>
  );
};

export default CitizensProgramTable;