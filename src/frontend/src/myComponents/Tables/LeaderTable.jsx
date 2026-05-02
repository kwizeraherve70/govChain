import React, { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

// Form submission
import { useDispatch,useSelector} from "react-redux";
import TableSkeleton from "../skeletors/tableSkeletor";
import { GetAllProgramThunk } from "../../Redux/action/GetAllProgram";
import { ProgramStatsThunk } from "../../Redux/action/ProgramStat";
import { getProfile } from "../../utils/endpoints";
import EnrolledCitizensModal from './EnrolledCitizensModal';



const LeaderTable = ({setStats}) => {
  const dispatch = useDispatch();
  const [myProfileId, setMyProfileId] = useState(null);

  useEffect(()=>{
    dispatch(GetAllProgramThunk())
    dispatch(ProgramStatsThunk())
    getProfile().then((res) => {
      if (res.Ok) setMyProfileId(res.Ok.ProfileId);
    });
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
      headerName: "Pending Requests",
      width: 170,
      renderCell: (params) => (
        <Link
          to={`/Leader/Programs/${params.row.ProgramId}/Request`}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-web3-accent/10 border border-web3-accent/30 text-web3-accent hover:bg-web3-accent/20 text-xs font-medium transition-colors"
        >
          Enroll Citizens
          {params.row.RequestCitizens.length > 0 && (
            <span className="bg-web3-accent text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 leading-none">
              {params.row.RequestCitizens.length}
            </span>
          )}
        </Link>
      ),
    },
    {
      field: "Citizens",
      headerName: "Citizens",
      width: 150,
      renderCell: (params) => (
        <EnrolledCitizensModal
          ProgramId={params.row.ProgramId}
          count={params.row.Citizens.length}
        />
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

    const myPrograms = useMemo(() => {
      if (!Allprogram || !myProfileId) return [];
      return Allprogram.filter((p) => p.LocalLeaders.includes(myProfileId));
    }, [Allprogram, myProfileId]);

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
        {loadingz || myProfileId === null?
     (<div className="text-center">
      <TableSkeleton />
   </div>):
   (myPrograms.length === 0 || Errorz)?(
    <div className="text-center text-white/50 py-8">
          <p>No programs assigned to you yet.</p>
    </div>
  ):(
      <DataGrid
          getRowId={(row)=>(row.ProgramId)}
          rows={myPrograms}
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
          '--DataGrid-containerBackground': 'rgba(255,255,255,0.04)',
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
          '& .MuiDataGrid-overlayWrapper': { minHeight: '80px' },
          '& .MuiDataGrid-overlay': { backgroundColor: 'rgba(9,10,24,0.8)', color: 'rgba(255,255,255,0.4)' },
        }}
        />
      )}  
      </Box>
    </>
  );
};

export default LeaderTable;