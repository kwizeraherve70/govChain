import React , {useState } from "react";
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllLeaderThunk } from "@/Redux/action/GetAllLeader";
import { BeatLoader } from "react-spinners";
import { AddLeaderToProgramThunk } from "@/Redux/action/AddLeader";



const AddLeader=({ProgramId})=>{
    const [addLeader, setAddLeader] = useState(" ")
    const dispatch = useDispatch()
    const GetLeaders=()=>{
      dispatch(GetAllLeaderThunk())
    }
    const ChangeLeader =(value)=> {
      console.log("leaderId",value)
        setAddLeader(value)
    }

    const Sender=()=>{
        if(addLeader){
            const LeaderId = addLeader
          dispatch(AddLeaderToProgramThunk({ProgramId,LeaderId}))
        }
    }
   
   
    const {loading, GetAllLeader, error } = useSelector((state)=>state.GetAllLeader)
    const  {   load } = useSelector((state)=> state.AddLeader)
    return(
        <Box>
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline" onClick={GetLeaders}>Add Leader</Button>
  </PopoverTrigger>
  <PopoverContent className="w-[95%]">
    <div className="grid gap-4">
      <h4 className="font-medium leading-none">Local Leader</h4>
      {loading?(<div className="text-center">
            <p>Loading ....</p>
           </div>):(GetAllLeader?.length  === 0|| error)?(
             <div style={{textAlign: "center"}}>
             <p>No Leader In system</p>
       </div>
           ):(
            <form>
              <div className="grid gap-2">
            <div className="flex items-center gap-2">
                <Select  onValueChange={(value) => {ChangeLeader(value) }}>
                <SelectTrigger className="w-full">
                  <SelectValue className="px-9" placeholder="Local Leader" />
                </SelectTrigger>
                <SelectContent>
                    {GetAllLeader?.map((item)=>(
                        <SelectItem key={item.ProfileId}  value={item.ProfileId}>{item.Fullname} </SelectItem> 
                    ))}
            
                </SelectContent>
              </Select>
              <Button 
             className={`relative px-6 py-2 text-white font-semibold rounded-lg transition-all ${
              load && "bg-gray-900 opacity-50 cursor-not-allowed"}`}x
             type="submit"
             disabled={load}
             onClick={Sender}
             >{
              load? (
                <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 bg-black -translate-y-1/2">
                  <BeatLoader color="white" loading={load} size={10}/>
                </div>
              ):(
                "Change"
              )
             }</Button> 
            </div>
          </div>
            </form>
           )}
      
    </div>
  </PopoverContent>
</Popover>
</Box>
    )
}

export default AddLeader