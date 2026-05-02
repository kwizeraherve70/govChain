import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import LeaderStockTable from "@/myComponents/Tables/LeaderStockTable";
import { MyTransactionsThunk } from "@/Redux/action/MyTransactions";

const LeaderStock = () => {
    const dispatch = useDispatch();
    const { load, MyTransactions, error } = useSelector((state) => state.MyTransactions);

    useEffect(() => {
        dispatch(MyTransactionsThunk());
    }, [dispatch]);

    const rows = (MyTransactions || []).map((tx) => ({
        ...tx,
        StatusKey: tx.Status ? Object.keys(tx.Status)[0] : "PENDING",
    }));

    const columns = [
        { field: "TransactionId", headerName: "Transaction ID", flex: 1, minWidth: 130 },
        { field: "StockId",       headerName: "Stock ID",       flex: 1, minWidth: 110 },
        { field: "ReceiverId",    headerName: "Recipient",      flex: 1, minWidth: 130 },
        { field: "Quantity",      headerName: "Quantity", type: "number", flex: 0.5, minWidth: 70 },
        {
            field: "StatusKey",
            headerName: "Status",
            flex: 1,
            minWidth: 110,
            renderCell: (params) => {
                if (params.value === "ACCEPTED") {
                    return <span className="badge-success">ACCEPTED</span>;
                }
                if (params.value === "REJECT") {
                    return <span className="badge-warning">REJECTED</span>;
                }
                return <span className="badge-danger">PENDING</span>;
            },
        },
        { field: "CreatedAt", headerName: "Date", flex: 1, minWidth: 110 },
    ];

    return (
        <>
            <div className="px-5 pt-5 pb-2">
                <h1 className="text-3xl font-extrabold gradient-text">My Stock</h1>
                <p className="text-white/40 text-sm mt-1">Allocated resources & materials</p>
            </div>

            <div className="w-[95%] mx-auto">
                <LeaderStockTable />
            </div>

            {/* Distribution History */}
            <div className="w-[95%] mx-auto mt-6 bg-white/[0.05] backdrop-blur-lg border border-white/[0.1] rounded-2xl overflow-hidden">
                <header className="px-5 py-4 border-b border-white/[0.08]">
                    <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                        My Distribution History
                    </h2>
                </header>
                <div className="p-4">
                    {load ? (
                        <p className="text-white/40 text-sm">Loading history...</p>
                    ) : !MyTransactions || MyTransactions.length === 0 || error ? (
                        <p className="text-white/30">No distributions made yet</p>
                    ) : (
                        <DataGrid
                            getRowId={(row) => row.TransactionId}
                            rows={rows}
                            columns={columns}
                            slots={{ toolbar: GridToolbar }}
                            sx={{
                                border: "none",
                                color: "rgba(255,255,255,0.75)",
                                fontFamily: "inherit",
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
                            }}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default LeaderStock;
