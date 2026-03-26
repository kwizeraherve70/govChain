const CreateProfile=async(Profile)=>{ 
  return  await window.canister.GovTransChainApi.CreateProfile(Profile)
}
const getProfile=async()=>{
  return await window.canister.GovTransChainApi.getProfile()
}
const GetAllProfile=async()=>{
  return await window.canister.GovTransChainApi.GetAllProfile()
}
// Program endpoint
const CreateProgram=async(Program)=>{
  console.log(Program, "hello")
  return await window.canister.GovTransChainApi.CreateProgram(Program)
}

const GetAllProgram=async()=> {
  return await window.canister.GovTransChainApi.GetAllProgram()
}

const ProgramStats =async()=>{
  return await window.canister.GovTransChainApi.ProgramStats()
}




// Stock endpoint
const CreateStock=async(Stock)=>{
  console.log(Stock)
  return await window.canister.GovTransChainApi.CreateStock(Stock)
}

const GetAllStock=async()=>{
  return await window.canister.GovTransChainApi.GetAllStock()
}

const StockStats =async()=>{
  return await window.canister.GovTransChainApi.StockStats()
}


const GetStore=async()=>{
  return await window.canister.GovTransChainApi.GetStore()
}
const ChangeRole=async(RolePayload)=>{
  return await window.canister.GovTransChainApi.ChangeRole(RolePayload)
}

const getProfilesByRole=async(Role)=>{
  return await window.canister.GovTransChainApi.getProfilesByRole(Role)
}

const AddLeaderToProgram =async(ProgramId,LeaderId)=>{
  return await window.canister.GovTransChainApi.AddLeaderToProgram(ProgramId,LeaderId)
}

const CitizenRequest=async(ProgramId)=>{
  return await window.canister.GovTransChainApi.CitizenRequest(ProgramId)
}

const ViewRequest=async(ProgramId)=>{
  return await window.canister.GovTransChainApi.ViewRequest(ProgramId)
}


const ApproveRequest=async(ProgramId,ProfileId)=>{
  return await window.canister.GovTransChainApi.ApproveRequest(ProgramId,ProfileId)
}

const Transfer= async(Payload)=>{
  console.log("Transfer",Payload)
  return await window.canister.GovTransChainApi.Transfer(Payload)
}
const Distribute=async(Payload)=>{
  console.log(Payload,"Distribute")
  return await window.canister.GovTransChainApi.Distribute(Payload)
}

const ProgramLeaders =async(ProgramId)=>{
  return await window.canister.GovTransChainApi.ProgramLeaders(ProgramId)
}

const GetAllLeader =async()=>{
  return await window.canister.GovTransChainApi.GetAllLeader()
}


const ProgramCitizens=async(ProgramId)=>{
  return await window.canister.GovTransChainApi.ProgramCitizens(ProgramId)
}
const AllTransactions = async()=>{
  return await window.canister.GovTransChainApi.AllTransactions()
}





export { 
  CreateProfile,
  getProfile,
  GetAllProfile,
  CreateProgram,
  ProgramStats,
  CreateStock,
  GetAllStock,
  StockStats,
  GetStore,

  ChangeRole,
  getProfilesByRole,
  AddLeaderToProgram,
  CitizenRequest,
  ViewRequest,
  ApproveRequest,

  Transfer,
  Distribute,
  
  GetAllProgram,
  ProgramLeaders,
  ProgramCitizens,
  GetAllLeader,

  AllTransactions
}



