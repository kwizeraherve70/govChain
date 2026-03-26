import React, { useEffect, useMemo } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button } from "../components/ui/button";
import { FaPlus } from "react-icons/fa";

// Dialog Components
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";



import { Link } from "react-router-dom";

// Form submission

import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch,useSelector} from "react-redux";
import { useForm } from 'react-hook-form';
import { ProgramValid } from "../validation/ProgramValid";
import { CreateProgramThunk } from "../Redux/action/CreateProgram";
import { BeatLoader } from "react-spinners";
import TableSkeleton from "./skeletors/tableSkeletor";
import { GetAllProgramThunk } from "../Redux/action/GetAllProgram";
import { ProgramStatsThunk } from "../Redux/action/ProgramStat";
import AddLeader from "./AddLeaderPop";



const Table = ({setStats}) => {
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
          to={`/Admin/Programs/${params.row.ProgramId}/Request`}
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
    {
      field: "Add Leader",
      headerName: "Add Leader",
      renderCell: (params) => (
       <AddLeader ProgramId={params.row.ProgramId}/>
      ),
    }
  ];
    // submission handling
    const { 
      register, 
      handleSubmit, 
      setValue, formState: { errors } } = useForm({
      resolver: yupResolver(ProgramValid),
    });

    
    const submit=async(data)=>{
      const cleanData = {
        ...data,
        Beneficials:data.Beneficials.toString()
      }
   await  dispatch(CreateProgramThunk(cleanData))
    dispatch(GetAllProgramThunk())
    dispatch(ProgramStatsThunk())
    }
    const { loading, errorz } = useSelector((state)=>state.Program)
    const { loadingz,Allprogram,Errorz  } = useSelector((state)=> state.AllProgram)
    const  { loadingS, ProgramStats, ErrorZ } = useSelector((state)=> state.ProgramStat)
    useMemo(()=>{
        setStats(ProgramStats)
    },[ProgramStats])
  return (
    <>
      <div className="flex justify-end mb-3 font-bold">
        <Dialog>
          <DialogTrigger asChild>
            <Button><FaPlus /> New Program</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Program</DialogTitle>
            </DialogHeader>
             <form onSubmit={handleSubmit(submit)}>
             <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="Name" className="text-right">Name</Label>
                <Input id="Name" {...register("Name")} placeholder="Program name" className="col-span-3" />
                {errors.Name && <p className="text-red-500">{errors.Name.message}</p>}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="Beneficials" className="text-right">Beneficials</Label>
                <Input id="Beneficials" {...register("Beneficials")} type="number" className="col-span-3" placeholder="0" />
                {errors.Beneficials && <p className="text-red-500">{errors.Beneficials.message}</p>}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="Description" className="text-right">Description</Label>
                <Textarea className="col-span-3" id="Description" {...register("Description")}/>
                {errors.Description && <p className="text-red-500">{errors.Description.message}</p>}
              </div>
            </div>
            <DialogFooter>
            <Button 
               className={`relative px-6 py-2 text-white font-semibold rounded-lg transition-all ${
                loading && "bg-gray-900 opacity-50 cursor-not-allowed"}`}x
               type="submit"
               disabled={loading}
               >{
                loading? (
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 bg-black -translate-y-1/2">
                    <BeatLoader color="white" loading={loading} size={10}/>
                  </div>
                ):(
                  "Create Program"
                )
               }</Button>
            </DialogFooter>
             </form>
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

export default Table;