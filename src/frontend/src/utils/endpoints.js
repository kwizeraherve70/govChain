const CreateProfile=async(Profile)=>{ 
  return  await window.canister.GovChainApi.CreateProfile(Profile)
}
const getProfile=async()=>{
  return await window.canister.GovChainApi.getProfile()
}
const GetAllProfile=async()=>{
  return await window.canister.GovChainApi.GetAllProfile()
}
// Program endpoint
const CreateProgram=async(Program)=>{
  console.log(Program, "hello")
  return await window.canister.GovChainApi.CreateProgram(Program)
}

const GetAllProgram=async()=> {
  return await window.canister.GovChainApi.GetAllProgram()
}

const ProgramStats =async()=>{
  return await window.canister.GovChainApi.ProgramStats()
}




// Stock endpoint
const CreateStock=async(Stock)=>{
  console.log(Stock)
  return await window.canister.GovChainApi.CreateStock(Stock)
}

const GetAllStock=async()=>{
  return await window.canister.GovChainApi.GetAllStock()
}

const StockStats =async()=>{
  return await window.canister.GovChainApi.StockStats()
}


const GetStore=async()=>{
  return await window.canister.GovChainApi.GetStore()
}
const ChangeRole=async(RolePayload)=>{
  return await window.canister.GovChainApi.ChangeRole(RolePayload)
}

const getProfilesByRole=async(Role)=>{
  return await window.canister.GovChainApi.getProfilesByRole(Role)
}

const AddLeaderToProgram =async(ProgramId,LeaderId)=>{
  return await window.canister.GovChainApi.AddLeaderToProgram(ProgramId,LeaderId)
}

const CitizenRequest=async(ProgramId)=>{
  return await window.canister.GovChainApi.CitizenRequest(ProgramId)
}

const ViewRequest=async(ProgramId)=>{
  return await window.canister.GovChainApi.ViewRequest(ProgramId)
}


const ApproveRequest=async(ProgramId,ProfileId)=>{
  return await window.canister.GovChainApi.ApproveRequest(ProgramId,ProfileId)
}

const RejectRequest=async(ProgramId,ProfileId)=>{
  return await window.canister.GovChainApi.RejectRequest(ProgramId,ProfileId)
}

const Transfer= async(Payload)=>{
  console.log("Transfer",Payload)
  return await window.canister.GovChainApi.Transfer(Payload)
}
const Distribute=async(Payload)=>{
  console.log(Payload,"Distribute")
  return await window.canister.GovChainApi.Distribute(Payload)
}

const ProgramLeaders =async(ProgramId)=>{
  return await window.canister.GovChainApi.ProgramLeaders(ProgramId)
}

const GetAllLeader =async()=>{
  return await window.canister.GovChainApi.GetAllLeader()
}


const ProgramCitizens=async(ProgramId)=>{
  return await window.canister.GovChainApi.ProgramCitizens(ProgramId)
}
const AllTransactions = async()=>{
  return await window.canister.GovChainApi.AllTransactions()
}

const MyTransactions = async()=>{
  return await window.canister.GovChainApi.MyTransactions()
}

const ApproveTransaction = async(TransactionId) => {
 console.log('or the issue is here',TransactionId)
  return await window.canister.GovChainApi.ApproveTransaction(TransactionId)
}

const RejectTransaction = async(TransactionId) => {
  return await window.canister.GovChainApi.RejectTransaction(TransactionId)
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
  RejectRequest,

  Transfer,
  Distribute,
  
  GetAllProgram,
  ProgramLeaders,
  ProgramCitizens,
  GetAllLeader,

  AllTransactions,
  MyTransactions,
  ApproveTransaction,
  RejectTransaction,
}



