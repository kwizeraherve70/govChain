import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
    Dialog, 
    DialogContent, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BeatLoader } from "react-spinners";

import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch,useSelector} from "react-redux";
import { useForm } from 'react-hook-form';
import { DistributeThunk } from "@/Redux/action/Distribute";
import { ProgramCitizensThunk } from "@/Redux/action/ProgramCitizens";
import { DistributeValid, TransferValid } from "@/validation/TransferValid";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DistributePop=({ProgramId,StockId})=>{
  const [ReceiverId, setReceiver ] = useState(" ");
    const dispatch = useDispatch()
  const GetLeader=()=>{
    dispatch(ProgramCitizensThunk({ProgramId}))
  }

  const ReceiverChange =(value)=>{
    setReceiver(value)
  } 
  
  // Transfer submit
  const { 
    register, 
    handleSubmit, 
    setValue, formState: { errors } } = useForm({
    resolver: yupResolver(DistributeValid),
  });
  const submit=(data)=>{
    console.log(data)
    if(ReceiverId) {
      const cleanData = {
        ...data,
        StockId,
        Quantity: data.Quantity.toString(),
        ReceiverId
      }
      console.log(cleanData)
      dispatch(DistributeThunk(cleanData))
    }
  }
  const {   Loading, ProgramCitizens, Error, } = useSelector((state)=>state.ProgramCitizens)
  const { Dloading  } = useSelector((state)=>state.Distribute)
    return(
        <Dialog>
        <DialogTrigger asChild>
          <Button onClick={GetLeader}>Distribute</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Distribute</DialogTitle>
          </DialogHeader>
           {Loading?(<div className="text-center">
            <p>Loading ....</p>
           </div>):(ProgramCitizens?.length  === 0|| Error)?(
             <div style={{textAlign: "center"}}>
             <p>No Citizen for Program</p>
       </div>
           ):(
            <>
            <form onSubmit={handleSubmit(submit)}>
           <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input id="StockId" type="hidden" placeholder="Program name" className="col-span-3" />
              {/* {errors.Name && <p className="text-red-500">{errors.Name.message}</p>} */}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Quantity" className="text-right">Quantity</Label>
              <Input id="Quantity"  type="number" {...register("Quantity")} className="col-span-3" placeholder="0" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Description" className="text-right">Receiver Citizen</Label>
            
            <Select onValueChange={ReceiverChange}>
            <SelectTrigger className="w-full">
              <SelectValue className="px-9" placeholder="Local Leader" />
            </SelectTrigger>
            <SelectContent className="w-full">
              {ProgramCitizens?.map((item)=>(
                 <SelectItem value={item.ProfileId} key={item.ProfileId}>{item.Fullname}</SelectItem>
              ))}
            </SelectContent>
          </Select>
            </div>
          </div>
          <DialogFooter>
          <Button 
             className={`relative px-6 py-2 text-white font-semibold rounded-lg transition-all ${
                Dloading && "bg-gray-900 opacity-50 cursor-not-allowed"}`}x
             type="submit"
             disabled={Dloading}
             >{
                Dloading? (
                <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 bg-black -translate-y-1/2">
                  <BeatLoader color="white" loading={Dloading} size={10}/>
                </div>
              ):(
                "Distribute"
              )
             }</Button>
          </DialogFooter>
           </form>
            </>
           )
           }
        </DialogContent>
      </Dialog>
    )
}


export default DistributePop