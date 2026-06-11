import React, { useState , useEffect} from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button } from "../../components/ui/button";
import { FaPlus } from "react-icons/fa";

// Dialog Components
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

// Form submission

import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch,useSelector} from "react-redux";
import { useForm } from 'react-hook-form';
import { StockValid } from "../../validation/StockValid";
import { CreateStockThunk } from "../../Redux/action/CreateStock";
import { BeatLoader } from "react-spinners";
import TableSkeleton from "../skeletors/tableSkeletor";
import { GetAllProgramThunk } from "@/Redux/action/GetAllProgram";
import { GetAllStockThunk } from "@/Redux/action/GetAllStock";
import TransferPop from "./TransferPop";
import { ToastError } from "@/utils/toast";



const StockTable = () => {
  const [Program, setProgram ] = useState("")
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(GetAllProgramThunk())
    dispatch(GetAllStockThunk())
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
      field: "RemainingStock",
      headerName: "Remaining Stock",
      width: 150,
      // renderCell: (params) => (
      //   <Link
      //     to={`/Programs/${params.row.id}/Request`}
      //     style={{ color: "blue", textDecoration: "underline" }}
      //   >
      //     {params.row.RequestCitizens}
      //   </Link>
      // ),
    },
    { field: "CreatedAt", headerName: "CreatedAt", width: 150 },
    { field: "UpdatedAt", headerName: "UpdatedAt", width: 150 },
    { 
      field: "Action", 
      headerName: "Action", 
      width: 150,
      renderCell: (params)=>(
        <TransferPop ProgramId={params.row.ProgramId} StockId={params.row.StockId} key={params.row.StockId}/>
      )
    },
  ];

    // submission handling
    const handleProgram =(value)=>{
      setProgram(value)
    }
    const { 
      register, 
      handleSubmit, 
      setValue, formState: { errors } } = useForm({
      resolver: yupResolver(StockValid),
    });
    const submit=async(data)=>{
      if(!Program.trim()){
        ToastError("Please select a program for this stock");
        return;
      }
      const cleanData = {
        ...data,
        Quantity:data.Quantity.toString(),
        ProgramId:Program
      }
      await dispatch(CreateStockThunk(cleanData))
      dispatch(GetAllStockThunk())
    }
    const { load  } = useSelector((state)=>state.CreateStock)
    const  { loading,AllStock,errorz } = useSelector((state)=>state.AllStocks)
    const { loadingz,Allprogram,Errorz  } = useSelector((state)=> state.AllProgram)
  return (
    <>
      <div className="flex justify-end mb-3 font-bold">
  <Dialog>
    <DialogTrigger asChild>
      <Button className="btn-web3 flex items-center gap-2"><FaPlus /> New Stock</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      {loadingz?
     (<div className="text-center text-white/50 py-4">
      <p>Loading...</p>
   </div>):
   (Allprogram?.length  === 0|| Errorz)?(
    <div className="text-center text-white/50 py-4">
          <p>No Program or there is error! Reload</p>
    </div>
  ):(
    <>
  <DialogHeader>
    <DialogTitle>Create Stock</DialogTitle>
  </DialogHeader>
   <form onSubmit={handleSubmit(submit)}>
   <div className="grid gap-4 py-4">
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="name" className="text-right">Program</Label>
      <Select onValueChange={handleProgram}>
            <SelectTrigger className="w-full col-span-3">
              <SelectValue className="px-9" placeholder="Select a program" />
            </SelectTrigger>
            <SelectContent>
              {Allprogram?.map((item)=>(
                 <SelectItem value={item.ProgramId} key={item.ProgramId}>{item.Name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="StockName" className="text-right">Item Name</Label>
      <Input id="StockName" type="text" {...register("StockName")} className="col-span-3" placeholder="Name of item" />
      {errors.StockName && <p className="text-red-500">{errors.StockName.message}</p>}
    </div>
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="Description" className="text-right">Quantity</Label>
      <Input id="Quantity" type="number" {...register("Quantity")} className="col-span-3" placeholder="0" />
      {errors.Quantity && <p className="text-red-500">{errors.Quantity.message}</p>}
    </div>
  </div>
  <DialogFooter>
  <Button 
    className={`relative px-6 py-2 text-white font-semibold rounded-lg transition-all ${
    load && "bg-gray-900 opacity-50 cursor-not-allowed"}`}
               type="submit"
               disabled={load}
               >{
                load? (
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 bg-black -translate-y-1/2">
                    <BeatLoader color="white" loading={load} size={10}/>
                  </div>
                ):(
                  "Create Stock"
                )
               }</Button>
  </DialogFooter>
   </form>

      </>)}
  </DialogContent>
 </Dialog>
 </div>

      <Box
        sx={{
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            // Customize toolbar button styles
          },
        }}
      >
       {loading?
     (<div className="text-center">
      <TableSkeleton />
   </div>):
   (AllStock?.length  === 0|| errorz)?(
    <div className="text-center text-white/50 py-8">
          <p>No Stock or there is error! Reload</p>
    </div>
  ):(
    <DataGrid
    getRowId={(row)=>(row.StockId)}
    rows={AllStock}
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
      )
      }
      </Box>
    </>
  );
};

export default StockTable;