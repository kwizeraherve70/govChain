import { Button } from "../components/ui/button"
import { login , logout} from "@/utils/auth"




const HomePage=()=>{
    return(
        <div className="h-screen w-full overflow-clip bg-[#65a8fd] relative">
            <div className="flex  justify-between p-5">
                <span className="ml-4 text-white font-bold text-xl"> GovTransChain</span>
                <span className="mr-4 bg-[#65a8fd] p-2 text-white font-bold shadow-sm rounded-full">?</span>
            </div>

            <div className="w-[50%] mx-auto absolute top-[30%] left-[10%] md:left-[35%]">
                <h1 className="text-white text-7xl text-bold">GovTransChain</h1>
                <p className="text-center ml-3 text-wrap max-w-md text-white mt-6 text-bold
                opacity-75 font-extralight
                ">Blockchain ensures secure, tamper-proof government transactions, 
                    offering real-time transparency and traceability.</p>
               {window.auth.isAuthenticated?  
               <Button className="w-1/2 ml-10 mt-6 bg-[#0f82e0] text-xl" onClick={logout}>LogOut</Button>:
                <Button className="w-1/2 ml-10 mt-6 bg-[#0f82e0] text-xl" onClick={login}>Login</Button>}

            </div>
           
                  
        </div>
    )
}
export default HomePage