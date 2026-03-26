import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { CitizenRequestThunk } from "@/Redux/action/CitizenRequest";
import { Button } from "@/components/ui/button";
import { BeatLoader } from "react-spinners";


const RequestAction=({data})=>{
  const dispatch = useDispatch();
   
  const Request=async()=>{
    dispatch(CitizenRequestThunk(data));
    }
    const { load } = useSelector((state)=>state.Citizenrequest)
    return(
        <Button 
        className={`relative px-6 py-2 text-white font-semibold rounded-lg transition-all ${
         load && "bg-gray-900 opacity-50 cursor-not-allowed"}`}x
        type="submit"
        disabled={load}
        onClick={Request}
        >{
          load? (
           <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 bg-black -translate-y-1/2">
             <BeatLoader color="white" loading={load} size={10}/>
           </div>
         ):(
           "Request"
         )
        }</Button>
    )
}

export default RequestAction