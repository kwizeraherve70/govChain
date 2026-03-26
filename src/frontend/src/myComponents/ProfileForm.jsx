import React, {useState,useContext} from "react";
import { Label } from "../components/ui/label"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button";
import { DatePickerDemo } from "./DateInput";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../components/ui/select"
import Welcome from "./Welcome";
import TopNavbar from "./TopBar";


import AuthContext from "../context/AuthContext";

import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch,useSelector} from "react-redux";
import { useForm } from 'react-hook-form';
import { ProfileValid } from "@/validation/profileValid";
import { CreateProfileThunk } from "@/Redux/action/createProfile";
import { BeatLoader } from "react-spinners";

const ProfileForm=()=>{
  const [date, setDate] = useState()
  const [Gender, setGender] = useState(" ");

  const {hasProfile, name, Role} = useContext(AuthContext);
  if(hasProfile){
    return <Welcome name={name} role={Role}/>
  }


  // clean data
  const handleGender = (value) => {
    setGender(value)
  }
  function formatDate(inputDateStr) {
    const date = new Date(inputDateStr);
    date.setDate(date.getDate() - 1);
    const formattedDate = date.toDateString().slice(4, 10) + ' ' + date.getFullYear();
    return formattedDate.split(" ").join("-");
  }

  const { 
    register, 
    control,
    handleSubmit, 
    setValue, formState: { errors } } = useForm({
    resolver: yupResolver(ProfileValid),
  });

  const dispatch = useDispatch();
  const submit=(data)=>{
    const FormatedDate = formatDate(date)
   const  { 
    Province,
    District,
    Sector,
    Cell,
    Email, 
    Fullname,
    Phone,
    NationalId
   } =data
   const newProfile = {
    Email, 
    Fullname,
    Phone,
    NationalId,
    DateOfBirthday:FormatedDate,
    Gender,
    Address:{
      Province,
    District,
    Sector,
    Cell,
    }
   } 
   dispatch(CreateProfileThunk(newProfile))  
  
  }
  const { load } = useSelector((state)=>state.Profile)
    return(
      <>
      <TopNavbar/>
      <h1 className="text-center text-2xl mt-4 font-bold">Profile Details</h1>
      <div className="w-[80%] md:w-[60%]  mx-auto">
        <form 
        onSubmit={handleSubmit(submit)}
        className=" bg-white shadow-sm mt-3 p-4 rounded-2xl">
        <div className="flex flex-wrap flex-row gap-2 justify-between">
            <div className="grid w-full mb-4 md:w-[45%]  items-center gap-1.5">
               <Label htmlFor="Fullname">Full-Name</Label>
              <Input type="text"  {...register('Fullname')}  id="Fullname" placeholder="Email" />
              {errors.Fullname && <p className="text-red-500">{errors.Fullname.message}</p>}
            </div>
            <div className="grid w-full mb-4  md:w-[45%] items-center gap-1.5">
                <Label htmlFor="Email">Email</Label>
                <Input type="email" id="Email" {...register('Email')} placeholder="Email" />
                {errors.Email && <p className="text-red-500">{errors.Email.message}</p>}
            </div>
        </div>
        <div className="flex flex-wrap flex-row gap-2 justify-between">
            <div className="grid w-full mb-4 md:w-[45%]  items-center gap-1.5">
               <Label htmlFor="NationalId">National Identity</Label>
              <Input type="number" id="NationalId" {...register('NationalId')} placeholder="National Identity" />
              {errors.NationalId && <p className="text-red-500">{errors.NationalId.message}</p>}
            </div>
            <div className="grid w-full mb-4  md:w-[45%] items-center gap-1.5">
                <Label htmlFor="Phone">Phone number</Label>
                <Input type="text" id="Phone" {...register('Phone')} placeholder="Phone number" />
                {errors.Phone && <p className="text-red-500">{errors.Phone.message}</p>}
            </div>
        </div>
        <div className="flex flex-wrap flex-row gap-2 justify-between">
            <div className="grid w-full mb-4 md:w-[45%]  items-center gap-1.5">
               <Label htmlFor="Province">Province</Label>
              <Input type="text" id="Province" {...register('Province')} placeholder="Province" />
              {errors.Province && <p className="text-red-500">{errors.Province.message}</p>}
            </div>
            <div className="grid w-full mb-4  md:w-[45%] items-center gap-1.5">
                <Label htmlFor="District">District</Label>
                <Input type="text" id="District" {...register('District')}  placeholder="District" />
                {errors.District && <p className="text-red-500">{errors.District.message}</p>}
            </div>
        </div>
        <div className="flex flex-wrap flex-row gap-2 justify-between">
            <div className="grid w-full mb-4 md:w-[45%]  items-center gap-1.5">
               <Label htmlFor="Sector">Sector</Label>
              <Input type="text" id="Sector" {...register('Sector')}  placeholder="Sector" />
              {errors.Sector && <p className="text-red-500">{errors.Sector.message}</p>}
            </div>
            <div className="grid w-full mb-4  md:w-[45%] items-center gap-1.5">
                <Label htmlFor="Cell">Cell</Label>
                <Input type="text" id="Cell" {...register('Cell')}  placeholder="Cell" />
                {errors.Cell && <p className="text-red-500">{errors.Cell.message}</p>}
            </div>
        </div>
        <div className="flex flex-wrap flex-row gap-2 justify-between">
            <div className="grid w-full mb-4 md:w-[45%]  items-center gap-1.5">
            < DatePickerDemo date={date} setDate={setDate}/>
            </div>
            <div className="grid w-full mb-4  md:w-[45%] items-center gap-1.5">
            <Select onValueChange={handleGender}>
          <SelectTrigger className="w-[60px]">
            <SelectValue className="w-full" placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
      
          </SelectContent>
        </Select>
            </div>
        </div>
          <div className="flex justify-center mt-4">
               <Button 
               className={`relative px-6 py-2 text-white font-semibold rounded-lg transition-all ${
                load
                  ? "bg-gray-400 opacity-50 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}x
               type="submit"
               disabled={load}
               >{
                load? (
                  <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2">
                    <BeatLoader color="#ffffff" loading={load} size={10} />
                  </div>
                ):(
                  "Create Profile"
                )


               }</Button>
          </div>
           
        </form>
      </div>
      </>
      
    )
}

export default ProfileForm;