import { Button } from "../components/ui/button"
import { useNavigate } from "react-router-dom"




const Welcome=({name, role})=>{
    const navigate = useNavigate();
    const goToHigh=()=>{
        navigate('/Admin/Dashboard')
    }
    const goToLocal=()=>{
        navigate('/Leader/Programs')
    }
    const goToCiti=()=>{
        navigate('/Citizens/Dashboard')
    }
    return(
        <div className="h-screen w-full overflow-clip bg-[#65a8fd] relative">
            <div className="flex  justify-between p-5">
                <span className="ml-4 text-white font-bold text-xl"> GovTransChain</span>
                <span className="mr-4 bg-[#65a8fd] p-2 text-white font-bold shadow-sm rounded-full">?</span>
            </div>

            <div className="w-[50%] mx-auto absolute top-[30%] left-[10%] md:left-[35%]">
                <h1 className="text-white text-xl text-bold">{name}</h1>
                <p className="text-wrap text-white mt-6 text-bold
                opacity-75 font-extralight
                ">Welcome, our good <span>{role}</span>. click below to proceed</p>

                
                {role=="HIGH_OFFICIAL" && 
                <Button  onClick={goToHigh} className="w-1/2  mt-6 bg-[#0f82e0] text-xl text-bold text-white">
                    Dashboard
                </Button>
                }
                {role=="LOCAL_LEADER" && 
                <Button  onClick={goToLocal} className="w-1/2  mt-6 bg-[#0f82e0] text-xl text-bold text-white">
                    Dashboard
                </Button>
                }
                {role=="CITIZEN" && 
                <Button  onClick={goToCiti} className="w-1/2  mt-6 bg-[#0f82e0] text-xl text-bold text-white">
                    Dashboard
                </Button>
                }
            </div>
           
                  
        </div>
    )
}
export default Welcome