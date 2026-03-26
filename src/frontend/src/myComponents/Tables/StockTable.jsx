import React, { useState , useEffect, useMemo} from "react";
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
import { StockStatsThunk } from "@/Redux/action/StockStat";
import TransferPop from "./TransferPop";



const StockTable = ({setStockStats}) => {
  const [Program, setProgram ] = useState(" ")
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(GetAllProgramThunk())
    dispatch(GetAllStockThunk())
    dispatch(StockStatsThunk())
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
      if(Program){
        const cleanData = {
          ...data,
          Quantity:data.Quantity.toString(),
          ProgramId:Program
        }
        await  dispatch(CreateStockThunk(cleanData))
        dispatch(GetAllStockThunk())
        dispatch(StockStatsThunk())
      }
      
   
    }
    const { load  } = useSelector((state)=>state.CreateStock)
    const  { loading,AllStock,errorz } = useSelector((state)=>state.AllStocks)
    const { loadingz,Allprogram,Errorz  } = useSelector((state)=> state.AllProgram)
    const { StockStats } = useSelector((state)=>state.StockStats)
    useMemo(()=>{
      setStockStats(StockStats)
    },[StockStats])
  return (
    <>
      <div className="flex justify-end mb-3 font-bold">
  <Dialog>
    <DialogTrigger asChild>
      <Button><FaPlus /> New Stock</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      {loadingz?
     (<div className="text-center">
      <p>Loading....</p>
   </div>):  
   (Allprogram?.length  === 0|| Errorz)?(
    <div style={{textAlign: "center"}}>
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
      <Label htmlFor="name" className="text-right">Item</Label>
      <Select onValueChange={handleProgram}>
            <SelectTrigger className="w-full">
              <SelectValue className="px-9" placeholder="Local Leader" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="w-full" value={null}>Program</SelectItem>
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
    load && "bg-gray-900 opacity-50 cursor-not-allowed"}`}x
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
     (<div style={{textAlign: "center"}}>
      <TableSkeleton />
   </div>):  
   (AllStock?.length  === 0|| errorz)?(
    <div style={{textAlign: "center"}}>
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
      )
      }
      </Box>
    </>
  );
};

export default StockTable;