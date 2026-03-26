import React, { useEffect, useMemo } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

// Form submission
import { useDispatch,useSelector} from "react-redux";
import TableSkeleton from "../skeletors/tableSkeletor";
import { GetAllProgramThunk } from "../../Redux/action/GetAllProgram";
import { ProgramStatsThunk } from "../../Redux/action/ProgramStat";



const LeaderTable = ({setStats}) => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(GetAllProgramThunk())
    dispatch(ProgramStatsThunk())
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
      renderCell: (params) => (
        <Link
          to={`/Leader/Programs/${params.row.ProgramId}/Request`}
          style={{ color: "blue", textDecoration: "underline" }}
        >
          {params.row.RequestCitizens.length}
        </Link>
      ),
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
    { field: "UpdatedAt", headerName: "UpdatedAt", width: 150 },
  ];
 
    const { loadingz,Allprogram,Errorz  } = useSelector((state)=> state.AllProgram)
    const  {  ProgramStats, } = useSelector((state)=> state.ProgramStat)
    useMemo(()=>{
        setStats(ProgramStats)
    },[ProgramStats])
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
    </>
  );
};

export default LeaderTable;