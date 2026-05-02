import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProgramCitizensThunk } from "@/Redux/action/ProgramCitizens";

const columns = [
  { field: "ProfileId", headerName: "ProfileId", width: 200 },
  { field: "Fullname", headerName: "Fullname", width: 180 },
  { field: "Gender", headerName: "Gender", width: 90 },
  { field: "NationalId", headerName: "NationalId", width: 160 },
  { field: "Phone", headerName: "Phone", width: 140 },
  { field: "CreatedAt", headerName: "Joined", width: 140 },
];

const datagridSx = {
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
};

const EnrolledCitizensModal = ({ ProgramId, count }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { Loading, ProgramCitizens, Error } = useSelector(
    (state) => state.ProgramCitizens
  );

  const handleOpen = (isOpen) => {
    setOpen(isOpen);
    if (isOpen) {
      dispatch(ProgramCitizensThunk({ ProgramId }));
    }
  };

  const rows = Array.isArray(ProgramCitizens) ? ProgramCitizens : [];

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>
        <button className="text-web3-purple underline hover:text-web3-accent font-medium">
          {count}
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] bg-[#0c0d22] border border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="gradient-text">Enrolled Citizens</DialogTitle>
        </DialogHeader>

        {Loading ? (
          <p className="text-white/40 text-sm py-4 text-center">
            Loading citizens...
          </p>
        ) : rows.length === 0 || Error ? (
          <p className="text-white/30 py-4 text-center">
            No enrolled citizens yet
          </p>
        ) : (
          <DataGrid
            getRowId={(row) => row.ProfileId}
            rows={rows}
            columns={columns}
            autoHeight
            pageSizeOptions={[5, 10, 25]}
            initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
            sx={datagridSx}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EnrolledCitizensModal;
