import { toast } from "react-toastify";

export const ToastSuccess=(data)=>{
    toast.success(`${data}`,
        {
     style:{
         backgroundColor: "white",
         color: "black"
     },
     autoClose: 2000
 })

}

export const ToastError =(data)=>{
    toast.error(`${data}`,
        {
     style:{
         backgroundColor: "white",
         color: "red"
     },
     autoClose: 2000
 })
}