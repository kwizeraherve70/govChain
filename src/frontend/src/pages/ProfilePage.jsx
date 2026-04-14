import React from "react";
import { Outlet } from "react-router";


const ProfilePage=()=>{
    return(
       <div className="bg-web3-dark h-screen overflow-y-auto">
          <Outlet/>
       </div>
    )
}

export default ProfilePage;