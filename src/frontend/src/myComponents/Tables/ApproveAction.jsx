import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { ApproveRequestThunk } from "@/Redux/action/ApproveRequest";
import { Button } from "@/components/ui/button";
import { BeatLoader } from "react-spinners";


const ApproveAction=({ProgramId,ProfileId})=>{
  const dispatch = useDispatch();
  
  const Approve=async()=>{
    
    dispatch(ApproveRequestThunk({ProgramId,ProfileId}));
    }
    const { load } = useSelector((state)=>state.Approverequest)
    return(
        <Button 
        className={`relative px-6 py-2 text-white font-semibold rounded-lg transition-all ${
         load && "bg-gray-900 opacity-50 cursor-not-allowed"}`}x
        type="submit"
        disabled={load}
        onClick={Approve}
        >{
          load? (
           <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 bg-black -translate-y-1/2">
             <BeatLoader color="white" loading={load} size={10}/>
           </div>
         ):(
           "Approve"
         )
        }</Button>
    )
}

export default  ApproveAction