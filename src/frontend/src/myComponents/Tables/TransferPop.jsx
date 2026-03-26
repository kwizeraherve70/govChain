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
import { TransferThunk } from "@/Redux/action/Transfer";
import { ProgramLeadersThunk } from "@/Redux/action/ProgramLeader";
import { TransferValid } from "@/validation/TransferValid";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TransferPop=({ProgramId,StockId})=>{
  const [ReceiverId, setReceiver ] = useState(" ");
    const dispatch = useDispatch()
  const GetLeader=()=>{
    dispatch(ProgramLeadersThunk({ProgramId}))
  }

  const ReceiverChange =(value)=>{
    setReceiver(value)
  } 
  
  // Transfer submit
  const { 
    register, 
    handleSubmit, 
    setValue, formState: { errors } } = useForm({
    resolver: yupResolver(TransferValid),
  });
  const submit=(data)=>{
    if(ReceiverId) {
      const cleanData = {
        ...data,
        Quantity: data.Quantity.toString(),
        ReceiverId
      }
      dispatch(TransferThunk({cleanData}))
    }
  }
  const { loadingz, ProgramLeaders, Errorz } = useSelector((state)=>state.ProgramLeaders)
  const { loading  } = useSelector((state)=>state.Transfer)
    return(
        <Dialog>
        <DialogTrigger asChild>
          <Button onClick={GetLeader}>Transfer</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Transfer</DialogTitle>
          </DialogHeader>
           {loadingz?(<div className="text-center">
            <p>Loading ....</p>
           </div>):(ProgramLeaders?.length  === 0|| Errorz)?(
             <div style={{textAlign: "center"}}>
             <p>No Leader for stock Program</p>
       </div>
           ):(
            <>
            <form onSubmit={handleSubmit(submit)}>
           <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Input id="StockId" type="hidden" value={StockId} {...register("StockId")} placeholder="Program name" className="col-span-3" />
              {/* {errors.Name && <p className="text-red-500">{errors.Name.message}</p>} */}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Quantity" className="text-right">Quantity</Label>
              <Input id="Quantity"  type="number" {...register("Quantity")} className="col-span-3" placeholder="0" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Description" className="text-right">Receiver Leader</Label>
            
            <Select onValueChange={ReceiverChange}>
            <SelectTrigger className="w-full">
              <SelectValue className="px-9" placeholder="Local Leader" />
            </SelectTrigger>
            <SelectContent>
              
              {ProgramLeaders?.map((item)=>(
                 <SelectItem value={item.ProfileId} key={item.ProfileId}>{item.Fullname}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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
                "Transfer"
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


export default TransferPop