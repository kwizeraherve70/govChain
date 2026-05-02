import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import TableSkeleton from "../skeletors/tableSkeletor";
import { GetAllProgramThunk } from "../../Redux/action/GetAllProgram";
import { getProfile } from "../../utils/endpoints";
import RequestAction from "./RequestAction";
import ProgramLeadersModal from "./ProgramLeadersModal";


const CitizensProgramTable = () => {
  const dispatch = useDispatch();
  const [myProfileId, setMyProfileId] = useState(null);

  useEffect(() => {
    dispatch(GetAllProgramThunk());
    // Fetch citizen's own profile once to know their ProfileId
    getProfile().then((res) => {
      if (res.Ok) setMyProfileId(res.Ok.ProfileId);
    });
  }, [dispatch]);

  const getRowStatus = (row) => {
    if (!myProfileId) return "idle";
    if (row.Citizens.includes(myProfileId)) return "enrolled";
    if (row.RequestCitizens.includes(myProfileId)) return "pending";
    return "idle";
  };

  const columns = [
    { field: "ProgramId", headerName: "ID", width: 100 },
    { field: "Name", headerName: "Program Name", width: 150 },
    {
      field: "LocalLeaders",
      headerName: "Local Leaders",
      width: 130,
      renderCell: (params) => (
        <ProgramLeadersModal
          ProgramId={params.row.ProgramId}
          count={params.row.LocalLeaders.length}
        />
      ),
    },
    {
      field: "RequestCitizens",
      headerName: "Requests",
      width: 110,
      renderCell: (params) => params.row.RequestCitizens.length,
    },
    {
      field: "Citizens",
      headerName: "Citizens",
      width: 100,
      renderCell: (params) => params.row.Citizens.length,
    },
    { field: "Beneficials", headerName: "Beneficials", width: 120 },
    { field: "Description", headerName: "Description", width: 150 },
    { field: "CreatedAt", headerName: "CreatedAt", width: 150 },
    {
      field: "Action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <RequestAction
          data={params.row.ProgramId}
          key={params.row.ProgramId}
          status={getRowStatus(params.row)}
        />
      ),
    },
  ];

  const { loadingz, Allprogram, Errorz } = useSelector((state) => state.AllProgram);

  return (
    <>
      <h1 className="text-5xl p-4 font-bold gradient-text">Programs</h1>
      <div className="w-[95%] mx-auto">
        <Box>
          {loadingz ? (
            <div className="text-center">
              <TableSkeleton />
            </div>
          ) : Allprogram?.length === 0 || Errorz ? (
            <div className="text-center text-white/50 py-8">
              <p>No Program or there is error! Reload</p>
            </div>
          ) : (
            <DataGrid
              getRowId={(row) => row.ProgramId}
              rows={Allprogram}
              columns={columns}
              slots={{ toolbar: GridToolbar }}
              sx={{
                border: "none",
                borderRadius: "12px",
                color: "rgba(255,255,255,0.75)",
                fontFamily: "inherit",
                backgroundColor: "rgba(255,255,255,0.03)",
                "--DataGrid-containerBackground": "rgba(255,255,255,0.04)",
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "rgba(255,255,255,0.04)",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.72rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                },
                "& .MuiDataGrid-row": {
                  backgroundColor: "transparent",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.03)" },
                },
                "& .MuiDataGrid-cell": { borderBottom: "none", color: "rgba(255,255,255,0.7)" },
                "& .MuiDataGrid-toolbarContainer": {
                  padding: "8px 4px",
                  "& .MuiButton-root": { color: "rgba(124,58,237,0.85)", fontSize: "0.75rem" },
                },
                "& .MuiTablePagination-root": { color: "rgba(255,255,255,0.5)" },
                "& .MuiIconButton-root": { color: "rgba(255,255,255,0.4)" },
                "& .MuiDataGrid-footerContainer": { borderTop: "1px solid rgba(255,255,255,0.08)" },
                "& .MuiInputBase-root": { color: "rgba(255,255,255,0.6)" },
                "& .MuiDataGrid-overlayWrapper": { minHeight: "80px" },
                "& .MuiDataGrid-overlay": {
                  backgroundColor: "rgba(9,10,24,0.8)",
                  color: "rgba(255,255,255,0.4)",
                },
              }}
            />
          )}
        </Box>
      </div>
    </>
  );
};

export default CitizensProgramTable;
