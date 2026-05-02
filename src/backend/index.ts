import {
    query,
    update,
    text,
    Record,
    StableBTreeMap,
    Variant,
    Vec,
    Ok,
    Err,
    ic,
    Principal,
    Opt,
    nat64,
    Result,
    bool,
    Canister,
    init,
    Void,
    nat,
  } from "azle/experimental";
  import { v4 as uuidv4 } from "uuid";
  import { 
    ProgramStats,
    StockStats 
  } 
  from "./systemStatistics";

  const AddressProp = Record({
    Province: text,
    District: text,
    Sector: text,
    Cell: text
  });
  type AddressProp = typeof AddressProp.tsType

  const RoleEnum = Variant({
    HIGH_OFFICIAL: text,
    LOCAL_LEADER: text,
    CITIZEN: text
  });
  type RoleEnum = typeof RoleEnum.tsType

  const UserProfile = Record({
    ProfileId: text,
    Fullname: text,
    DateOfBirthday: text,
    Gender: text,
    NationalId: nat64,
    Email: text,
    Phone: text,
    ProgramsJoined: Vec(text),
    Address: AddressProp,
    Role: RoleEnum,
    Owner: Principal,
    CreatedAt: text,
    UpdatedAt: text
  });

  type UserProfile = typeof UserProfile.tsType

  const UserProfileDisplay = Record({
    ProfileId: text,
    Fullname: text,
    DateOfBirthday: text,
    Gender: text,
    NationalId: nat64,
    Email: text,
    Phone: text,
    ProgramsJoined: Vec(text),
    Address: AddressProp,
    Role: RoleEnum,
    CreatedAt: text,
    UpdatedAt: text
  })
  type UserProfileDisplay = typeof UserProfileDisplay.tsType
  const UserProfilePayload = Record({
    Fullname: text,
    DateOfBirthday:text,
    Gender: text,
    NationalId: nat64,
    Email: text,
    Phone: text,
    Address: AddressProp,
  })
  type UserProfilePayload = typeof UserProfilePayload.tsType

  const ChangeRoleProps = Record({
    ProfileId: text,
    Role: text
  })

const Program = Record({
    ProgramId: text,
    Name: text,
    CreatedBy: Principal,
    LocalLeaders: Vec(text),
    RequestCitizens: Vec(text),
    Citizens: Vec(text),
    Beneficials: text,
    Description: text,
    CreatedAt: text,
    UpdatedAt: text,
    
});

type Program = typeof Program.tsType

const DisplayProgram = Record({
  ProgramId: text,
  Name: text,
  LocalLeaders: Vec(text),
  RequestCitizens: Vec(text),
  Citizens: Vec(text),
  Beneficials: text,
  Description: text,
  CreatedAt: text,
  UpdatedAt: text,
})
type DisplayProgram  = typeof DisplayProgram.tsType

const ProgramPayload = Record({
  Name: text,
  Beneficials: text,
  Description: text
});
type ProgramPayload = typeof ProgramPayload.tsType

const Stock= Record({
    StockId: text,
    ProgramId: text,
    StockName: text,
    Quantity: text,
    RemainingStock: text,
    CreatedBy: Principal,
    CreatedAt: text,
    UpdatedAt: text 
});
type Stock = typeof Stock.tsType

const StoreObject = Record({
  StockId :text,
  ProgramId: text,
  StockName: text,
  Quantity: text
})
type StoreObject = typeof  StoreObject.tsType
const Store = Record({
  stores: Vec(StoreObject)
})
type Store  = typeof Store.tsType

const StockPayload = Record({
  ProgramId: text,
  StockName: text,
  Quantity: text,
})

type StockPayload = typeof StockPayload.tsType


const TransactionEnum = Variant({
    TRANSFER: text,
    DISTRIBUTE: text
});

type TransactionEnum = typeof TransactionEnum.tsType

const TransactionStatus = Variant({
    ACCEPTED: text,
    REJECT: text,
    PENDING: text
})

type TransactionStatus = typeof TransactionStatus.tsType
const StockTransactions = Record({
    TransactionId: text,
    StockId: text,
    SenderId: text,
    ReceiverId: text,
    Quantity: text,
    TransactionType: TransactionEnum,
    Status: TransactionStatus,
    CreatedAt: text
})

type StockTransactions = typeof StockTransactions.tsType

const StockTransactionsProp = Record({
  StockId: text,
  ReceiverId: text,
  Quantity: text
})

type StockTransactionsProp = typeof StockTransactionsProp.tsType


const Message = Variant({
  NotFound: text,
  InvalidPayload: text,
  Error: text,
  NoProfile: text,
 Unauthorized: text
})

type Message = typeof Message.tsType

const ProgramStat=Record({
  totalProgram: nat,
  totalEnrolled: nat,
  totalBenefecials:nat
})

const StockStat=Record({
  totalStock: nat,
  totalQuantity: nat,
  totalRemaining:nat
})

const UserProfileStorage = StableBTreeMap<Principal,UserProfile>(0);
const ProgramStorage = StableBTreeMap<text, Program>(1);
const StockStorage = StableBTreeMap<text,Stock>(2)
const StockTransactionStorage = StableBTreeMap<text,StockTransactions>(3)
const StoreStorage = StableBTreeMap<text, Store>(4)

const userTaken =(email:text, NationalId: nat64)=>{
    const users = UserProfileStorage.values();
    if(users.length == 0){
        return 0
    }else {
        return users.map((user:UserProfile)=> user.Email).includes(email) || users.map((user:UserProfile)=> user.NationalId).includes(NationalId)
    }

}

const RoleAuth =(userRole: RoleEnum , Role:text)=> {
  if(Object.values(userRole)[0] == Role){
    return true
  }else{
    return false
  }
}

const Owner =(owner: Principal)=> {
  if(JSON.stringify(owner) === JSON.stringify(ic.caller())){
   return true
  }else{
    return false
  }
}

export default Canister({
    
    CreateProfile: update([UserProfilePayload], Result(text,Message), (payload)=>{
        try{   
          const {  Fullname,DateOfBirthday,Gender,NationalId,Email,Phone,Address, } = payload;
          if(
            !Fullname ||
            !DateOfBirthday ||
            !Gender ||
            !NationalId ||
            !Email ||
            !Phone ||
            !Address
          ){ 
            return Err({InvalidPayload: "Missing required fields"})
          }

          if(userTaken(Email,NationalId)){
            return Err({ Error: "User already exist!!!" })
        }else if(userTaken(Email,NationalId) === 0){
            
            const HighOfficialProfile : UserProfile={
              ProfileId: uuidv4(),
              Fullname,
              DateOfBirthday,
              Gender,
              NationalId,
              Email,
              Phone,
              ProgramsJoined: [],
              Address,
              Owner: ic.caller(),
              Role: {HIGH_OFFICIAL: "HIGH_OFFICIAL"},
              CreatedAt: getCurrentDate(),
             UpdatedAt: getCurrentDate()
            }

            UserProfileStorage.insert(ic.caller(),HighOfficialProfile);
            return Ok("You are High official")
        }else {
          const HighOfficialProfile : UserProfile={
            ProfileId: uuidv4(),
            Fullname,
            DateOfBirthday,
            Gender,
            NationalId,
            Email,
            Phone,
            ProgramsJoined: [],
            Address,
            Owner: ic.caller(),
            Role: {  CITIZEN: "CITIZEN"},
            CreatedAt: getCurrentDate(),
            UpdatedAt: getCurrentDate()
          }

          UserProfileStorage.insert(ic.caller(),HighOfficialProfile);
          return Ok("Successsfully registered")
        }

        }catch(error: any){
          return Err({Error: `Error occured ${error.message}`})
        }
    }),
    
    getProfile:query([],Result(UserProfile, Message),()=>{
      try{
         const ProfileOpt = UserProfileStorage.get(ic.caller());

         if(!ProfileOpt){
          return Err({NotFound:"Profile does not exist"})
         }
         if(!Owner(ProfileOpt.Owner)) {
          return Err({Error: "Access denied"})
         }
        return Ok(ProfileOpt)

      }catch(error:any){
        return Err({Error: `Error occured ${error.message}`})
      }
    }),
    GetAllLeader: query([],Result(Vec(UserProfile), Message),()=>{
      try{
        const UsersProfile = UserProfileStorage.values();
        if(UsersProfile.length == 0){
          return Err({ NotFound: "Empty user"})
        }
        const LeaderProfile = UsersProfile.filter((User: UserProfile)=>(
          (Object.values(User.Role)[0] == "LOCAL_LEADER")
        ))
        return Ok(LeaderProfile)
      }catch(error: any) {
        return Err({Err: `Error occured ${error.message}`})
      }
    }),
    GetAllProfile: query([], Result(Vec(UserProfileDisplay),Message),()=>{
     try{
      const Profiles = UserProfileStorage.values()
      if(!Profiles){
        return Err({NotFound:"NO profile"})
      }
       const SafeProfile = Profiles.map((profile:UserProfile)=>{
           const { Owner , ...safe } = profile
           return safe
       })
       return Ok(SafeProfile)
     }catch(error: any) {
      return Err({Error: `Error occured ${error.message}`})
     }
    }),


    // Program endpoints
    CreateProgram: update([ProgramPayload],Result(text, Message), (payload)=>{
      try{

        const { Name,Beneficials,Description} = payload;
        if(!Name || !Beneficials || !Description){
          return Err({InvalidPayload: "Missing required fields"})
        }
        
        const UserProfile = UserProfileStorage.get(ic.caller())

        if(!UserProfile){
          return Err({NoProfile: "No Profile"})
        }

        if(!RoleAuth(UserProfile.Role,"HIGH_OFFICIAL")){
         return Err({Unauthorized: "Access Denied"})
        }
        const NewProgram: Program ={
          ProgramId:  uuidv4(),
          Name,
          CreatedBy: ic.caller(),
          LocalLeaders: [],
          RequestCitizens: [],
          Citizens: [],
          Beneficials,
          Description,
          CreatedAt: getCurrentDate(),
          UpdatedAt: getCurrentDate(),
        }
        ProgramStorage.insert(NewProgram.ProgramId, NewProgram);
        return Ok("Created successfully")
      }catch(error: any){
        return Err({Error: `Error occured ${error.message}`})
      }
    }),
    GetAllProgram:query([], Result(Vec(DisplayProgram), Message),()=>{
      try{
         const Programs = ProgramStorage.values()
         if(Programs.length == 0) {
          return Err({NotFound:"Program is Empty"})
         }
          const SafePrograms = Programs.map((program:Program)=>{
            const { CreatedBy, ...safe } = program;
            return safe
          })
         return Ok(SafePrograms )
      }catch(error: any) {
        return Err({Err: `Error occured ${error.message}`})
      }
    }),

    ProgramStats:query([],Result(ProgramStat,Message),()=>{
      try{
        const Programs = ProgramStorage.values();

        if(Programs.length === 0){
          return Err({NotFound: "Empty Content"})
        }
      
       const ProgramsStats = ProgramStats(Programs);
       return Ok(ProgramsStats)
  
      }catch(error:any){
        return Err({Error: `Error Occured ${error.message}`})
      }
    }),

    // Stock endpoints
    CreateStock:update([StockPayload], Result(text, Message),(payload)=>{
      try{
        const {  ProgramId ,StockName,Quantity} = payload;
       const UserProfile = UserProfileStorage.get(ic.caller())
        const ProgramOpt  = ProgramStorage.get(ProgramId);

        if(!ProgramId || !StockName || !Quantity){
          return Err({InvalidPayload: "Missing required fields"})
        }
        if(!UserProfile){
          return Err({NoProfile: "No Profile"})
        }

        if(!RoleAuth(UserProfile.Role,"HIGH_OFFICIAL")){
          return Err({Unauthorized: "Access Denied"})
        }

        if(!ProgramOpt) {
          return Err({NotFound: "Program not found"})
        }
        const NewStock: Stock = {
          StockId: uuidv4(),
          ProgramId,
          StockName,
          Quantity,
          RemainingStock: Quantity,
          CreatedBy: ic.caller(),
          CreatedAt: getCurrentDate(),
          UpdatedAt: getCurrentDate()
        }
        
        StockStorage.insert(NewStock.StockId,NewStock)
        return Ok("Created successfully");
      }catch(error:any){
        return Err({Error: `Error Occured ${error.message}`})
      }
    }),

    GetAllStock:query([], Result(Vec(Stock), Message),()=>{
      try{
         const Stocks = StockStorage.values()
         if(Stocks.length == 0) {
          return Err({NotFound:"Stock is Empty"})
         }
         return Ok(Stocks)
      }catch(error: any) {
        return Err({Err: `Error occured ${error.message}`})
      }
    }),

    StockStats:query([],Result(StockStat,Message),()=>{
      try{
        const Stocks = StockStorage.values();

        if(Stocks.length === 0){
          return Err({NotFound: "Empty Content"})
        }
      
       const StocksStats = StockStats(Stocks);
       return Ok(StocksStats)
  
      }catch(error:any){
        return Err({Error: `Error Occured ${error.message}`})
      }
    }),

    MyTransactions: query([],Result(Vec(StockTransactions), Message),()=>{
      try{
        const UserProfileOpt = UserProfileStorage.get(ic.caller());
        if(!UserProfileOpt) return Err({NoProfile: "No Profile"});
        const allTx = StockTransactionStorage.values();
        const myTx = allTx.filter((tx: StockTransactions)=>(
          tx.SenderId === UserProfileOpt.ProfileId || tx.ReceiverId === UserProfileOpt.ProfileId
        ));
        if(myTx.length === 0) return Err({NotFound: "No transactions found"});
        return Ok(myTx);
      }catch(error: any){
        return Err({Error: `Error occured ${error.message}`})
      }
    }),

    AllTransactions: query([],Result(Vec(StockTransactions), Message),()=>{
      try{
          const UserProfileOpt = UserProfileStorage.get(ic.caller())
          if(!UserProfileOpt){
            return Err({NoProfile: "No Profile"})
          }
          const Transactions = StockTransactionStorage.values()
          if(Transactions.length== 0 ){
            return Err({NotFound: "Empty transaction"})
          }
          return Ok(Transactions)
      }catch(error: any){
        return Err({Error: `Error Occured ${error.message}`})
      }
    }),

    GetStore: query([], Result(Vec(StoreObject),Message),()=>{
      try{
          const UserProfile = UserProfileStorage.get(ic.caller())

         if(!UserProfile){
           return Err({NoProfile: "No Profile"})
         }
         const StoreOpt = StoreStorage.get(UserProfile.ProfileId)
         if(!StoreOpt){
          return Err({NotFound: "No Stores"})
         }
         if(StoreOpt.stores.length == 0 ){
          return Err({NotFound:"Empty stock"})
         }
         console.log(StoreOpt.stores)
         return Ok(StoreOpt.stores)
      }catch(error: any) {
        return Err({Error: `Error Occured ${error.message}`})
      }
    }),
    ChangeRole: update([ChangeRoleProps], Result(text, Message), (payload)=> {  
      try{
         const { ProfileId, Role } = payload;
         if(!ProfileId || !Role){
          return Err({InvalidPayload: "Missing required fields"})
        }
        
        const UserProfileOpt = UserProfileStorage.get(ic.caller())
        const AllUserProfile = UserProfileStorage.values()

        if(!UserProfileOpt){
          return Err({NoProfile: "No Profile"})
        }

        if(!RoleAuth(UserProfileOpt.Role,"HIGH_OFFICIAL")){
          return Err({Unauthorized: "Access Denied"})
        }
        if(AllUserProfile.length == 0) {
          return Err({NotFound: "No profile exist"})
        }
        const  userProfile = AllUserProfile.find((user: UserProfile)=>(
          user.ProfileId == ProfileId
        ))
        if(!userProfile) {
          return Err({NotFound: "No profile exist"})
        }
        let role;
         if(Role == "CITIZEN"){
            role ={  CITIZEN: "CITIZEN"}
         }else if(Role == "HIGH_OFFICIAL"){
          role ={  "HIGH_OFFICIAL": "HIGH_OFFICIAL"}
         }else {
          role= { "LOCAL_LEADER" : "LOCAL_LEADER"}
         }
         
        const updatedUser = {
          ...userProfile,
           "Role":  role
        }
        UserProfileStorage.insert(userProfile.Owner, updatedUser)
         return Ok("Updated successfully")
      }catch(error:any){
        return Err({Err: `Error occured ${error.message}`})
      }

    }),

    

    getProfilesByRole: query([text],Result(Vec(UserProfile), Message),(Role)=>{
      try{
        const userProfile = UserProfileStorage.values();
        if(userProfile.length == 0) {
          return Err({NotFound: "No available profile"})
        }

        const ProfilesByRole = userProfile.filter((user: UserProfile)=> (
          Object.values(user.Role)[0] === Role
        ))
        if(ProfilesByRole.length == 0) {
          return Err({NotFound: "No one with the role"})
        }
        return Ok(ProfilesByRole)
      }catch(error: any) {
        return Err({Err: `Error occured ${error.message}`})
      }

    }),
    AddLeaderToProgram: update([text,text], Result(text,Message), (ProgramId,LeaderId)=>{
      try{
        const UserProfileOpt = UserProfileStorage.get(ic.caller())
        const AllUserProfile = UserProfileStorage.values()
        const ProgramOpt = ProgramStorage.get(ProgramId)

        if(!UserProfileOpt){
          return Err({NoProfile: "No Profile"})
        }
        if(!RoleAuth(UserProfileOpt.Role,"HIGH_OFFICIAL")){
          return Err({Unauthorized: "Access Denied"})
        }

        if(!ProgramOpt) {
          return Err({NotFound: "Program no found"})
        }
        
        const  userLeader = AllUserProfile.find((user: UserProfile)=>(
          (user.ProfileId == LeaderId) &&  (Object.values(user.Role)[0] == "LOCAL_LEADER")
        ))
        console.log(userLeader)
        if(!userLeader) {
          return Err({NotFound: "No Exit or not leader"})
        }

        if(ProgramOpt.LocalLeaders.includes(LeaderId)){
          return Err({Error: "Already Exist"})
        }

        ProgramOpt.LocalLeaders.push(LeaderId)

        ProgramStorage.insert(ProgramOpt.ProgramId, ProgramOpt)
        return Ok("Leader add successfully")

      }catch(error: any) {
        return Err({Err: `Error occured ${error.message}`})
      }
    }),
 

    CitizenRequest: update([text], Result(text, Message), (ProgramId)=>{
      try{
        const UserProfileOpt = UserProfileStorage.get(ic.caller())
        const ProgramOpt = ProgramStorage.get(ProgramId)

        if(!UserProfileOpt){
          return Err({NoProfile: "No Profile"})
        }
        if(!ProgramOpt) {
          return Err({NotFound: "Program no found"})
        }
        if(!RoleAuth(UserProfileOpt.Role,"CITIZEN")){
          return Err({Unauthorized: "Access Denied"})
        }
        if(ProgramOpt.RequestCitizens.includes(UserProfileOpt.ProfileId) ||
        ProgramOpt.Citizens.includes(UserProfileOpt.ProfileId)
      ){
          return Err({Error: "Already in Program"})
        }

        ProgramOpt.RequestCitizens.push(UserProfileOpt.ProfileId)

        ProgramStorage.insert(ProgramId,ProgramOpt)
        return Ok("Request sent!")
      }catch(error: any) {
        return Err({Err: `Error occured ${error.message}`})
      }
    }),
  
    ProgramLeaders:query([text],Result(Vec(UserProfile),Message),(ProgramId)=>{
      try{
        const ProgramOpt = ProgramStorage.get(ProgramId)
        const AllUserProfile = UserProfileStorage.values()
        if(!ProgramOpt) {
          return Err({NotFound: "Program no found"})
        }
        if(ProgramOpt.LocalLeaders.length == 0) {
          return Err({NotFound: "NO requests"})
        }
        const ProgramLeader = AllUserProfile.filter((user: UserProfile)=> (
          ProgramOpt.LocalLeaders.includes(user.ProfileId)
        ))
        console.log(ProgramLeader)
        return Ok(ProgramLeader)
      }catch(error:any) {
        return Err({Error: `Error occured ${error.message}`})
      }
    }),

    ProgramCitizens:query([text],Result(Vec(UserProfile),Message),(ProgramId)=>{
      try{
        const ProgramOpt = ProgramStorage.get(ProgramId)
        const AllUserProfile = UserProfileStorage.values()
        if(!ProgramOpt) {
          return Err({NotFound: "Program no found"})
        }
        if(ProgramOpt.Citizens.length == 0) {
          return Err({NotFound: "NO requests"})
        }
        const ProgramCitizens = AllUserProfile.filter((user: UserProfile)=> (
          ProgramOpt.Citizens.includes(user.ProfileId)
        ))
        return Ok(ProgramCitizens)
      }catch(error:any) {
        return Err({Error: `Error occured ${error.message}`})
      }
    }),


    ViewRequest: query([text], Result(Vec(UserProfile),Message), (ProgramId)=>{
      try{
        const UserProfileOpt = UserProfileStorage.get(ic.caller())
        const AllUserProfile = UserProfileStorage.values()
        const ProgramOpt = ProgramStorage.get(ProgramId)
        
        if(!ProgramOpt) {
          return Err({NotFound: "Program no found"})
        }
        if(!UserProfileOpt){
          return Err({NoProfile: "No Profile"})
        }
        if(!RoleAuth(UserProfileOpt.Role,"HIGH_OFFICIAL") &&
           !RoleAuth(UserProfileOpt.Role,"LOCAL_LEADER")
        ){
          return Err({Unauthorized: "Access Denied"})
        }
        if(RoleAuth(UserProfileOpt.Role,"LOCAL_LEADER") &&
           !ProgramOpt.LocalLeaders.includes(UserProfileOpt.ProfileId)
        ){
          return Err({Unauthorized: "You are not assigned to this program"})
        }

        if(ProgramOpt.RequestCitizens.length == 0) {
          return Err({NotFound: "NO requests"})
        }

        const ProfileRequested = AllUserProfile.filter((user: UserProfile)=> (
          ProgramOpt.RequestCitizens.includes(user.ProfileId)
        ))
        return Ok(ProfileRequested)
      }catch(error: any) {
        return Err({Err: `Error occured ${error.message}`})
      }
    }),
   
    ApproveRequest: update([text, text],Result(text, Message), (ProgramId,ProfileId)=>{
      try{
        const UserProfileOpt = UserProfileStorage.get(ic.caller())
        const ProgramOpt = ProgramStorage.get(ProgramId)
        
        if(!ProgramOpt) {
          return Err({NotFound: "Program no found"})
        }
        if(!UserProfileOpt){
          return Err({NoProfile: "No Profile"})
        }
        if(!RoleAuth(UserProfileOpt.Role,"HIGH_OFFICIAL") &&
           !RoleAuth(UserProfileOpt.Role,"LOCAL_LEADER")
        ){
          return Err({Unauthorized: "Access Denied"})
        }
        if(RoleAuth(UserProfileOpt.Role,"LOCAL_LEADER") &&
           !ProgramOpt.LocalLeaders.includes(UserProfileOpt.ProfileId)
        ){
          return Err({Unauthorized: "You are not assigned to this program"})
        }

        if(!ProgramOpt.RequestCitizens.includes(ProfileId) ||
        ProgramOpt.Citizens.includes(ProfileId)
      ){
          return Err({Error: "Not request found or you exist in program"})
        }
        const removeFromRequest = ProgramOpt.RequestCitizens.filter((Citizen: text)=>(
          Citizen != ProfileId
        ));

        ProgramOpt.RequestCitizens = removeFromRequest;
        ProgramOpt.Citizens.push(ProfileId)
        ProgramStorage.insert(ProgramOpt.ProgramId,ProgramOpt)

        // Update citizen's ProgramsJoined list
        const AllUserProfiles = UserProfileStorage.values();
        const citizenProfile = AllUserProfiles.find((p: UserProfile) => p.ProfileId === ProfileId);
        if(citizenProfile && !citizenProfile.ProgramsJoined.includes(ProgramId)){
          citizenProfile.ProgramsJoined.push(ProgramId);
          UserProfileStorage.insert(citizenProfile.Owner, citizenProfile);
        }

       return Ok("Approved successfully")
      }catch(error: any) {
        return Err({Error: `Error occured ${error.message}`})
      }
    }),

    RejectRequest: update([text, text], Result(text, Message), (ProgramId, ProfileId) => {
      try {
        const UserProfileOpt = UserProfileStorage.get(ic.caller());
        const ProgramOpt = ProgramStorage.get(ProgramId);

        if (!ProgramOpt) {
          return Err({ NotFound: "Program not found" });
        }
        if (!UserProfileOpt) {
          return Err({ NoProfile: "No Profile" });
        }
        if (
          !RoleAuth(UserProfileOpt.Role, "HIGH_OFFICIAL") &&
          !RoleAuth(UserProfileOpt.Role, "LOCAL_LEADER")
        ) {
          return Err({ Unauthorized: "Access Denied" });
        }
        if (
          RoleAuth(UserProfileOpt.Role, "LOCAL_LEADER") &&
          !ProgramOpt.LocalLeaders.includes(UserProfileOpt.ProfileId)
        ) {
          return Err({ Unauthorized: "You are not assigned to this program" });
        }
        if (!ProgramOpt.RequestCitizens.includes(ProfileId)) {
          return Err({ NotFound: "No pending request found for this citizen" });
        }

        // Remove citizen from request list without enrolling them
        ProgramOpt.RequestCitizens = ProgramOpt.RequestCitizens.filter(
          (id: text) => id !== ProfileId
        );
        ProgramStorage.insert(ProgramOpt.ProgramId, ProgramOpt);

        return Ok("Request rejected");
      } catch (error: any) {
        return Err({ Error: `Error occured ${error.message}` });
      }
    }),

    Transfer:update([StockTransactionsProp],Result(text,Message),(payload)=> {
      try{
         const {  StockId, ReceiverId, Quantity } = payload;
         const UserProfileOpt = UserProfileStorage.get(ic.caller());
         const StockOpt = StockStorage.get(StockId);
        if(!UserProfileOpt){
          return Err({NoProfile: "No Profile"})
        }
        if(!RoleAuth(UserProfileOpt.Role,"HIGH_OFFICIAL")){
          return Err({Unauthorized: "Access Denied"})
        }

        if(!StockOpt) {
          return Err({NotFound: "Stock not found"})
        }

        const StockProgramOpt = ProgramStorage.get(StockOpt.ProgramId);

        if(!StockProgramOpt) {
          return Err({ NotFound: "Not program found"})
        }

        if(!StockProgramOpt.LocalLeaders.includes(ReceiverId)){
          return Err({NotFound: "Please the leader"})
        }

        if(Number(StockOpt.RemainingStock) < Number(Quantity)){
          return Err({Error: "No enough stock"})
        }

        const NewTransaction : StockTransactions = {
          TransactionId: uuidv4(),
          StockId,
          SenderId: UserProfileOpt.ProfileId,
          ReceiverId,
          Quantity,
          TransactionType: { TRANSFER: "TRANSFER"},
          Status: { PENDING: "PENDING"},
          CreatedAt: getCurrentDate()
        }

        StockTransactionStorage.insert(NewTransaction.TransactionId, NewTransaction);
        return Ok("Transfer pending approval")
      }catch(error: any) {
        return Err({Error:`Error occured ${error.message}`})
      }
    }),


    ApproveTransaction: update([text], Result(text, Message), (TransactionId) => {
      try {
        const UserProfileOpt = UserProfileStorage.get(ic.caller());
        if (!UserProfileOpt) return Err({ NoProfile: "No Profile" });
        if (!RoleAuth(UserProfileOpt.Role, "HIGH_OFFICIAL") && !RoleAuth(UserProfileOpt.Role, "LOCAL_LEADER")) {
          return Err({ Unauthorized: "Access Denied" });
        }
        const TxOpt = StockTransactionStorage.get(TransactionId);
        if (!TxOpt) return Err({ NotFound: "Transaction not found" });

        const txType = Object.keys(TxOpt.TransactionType)[0];

        if(txType === "TRANSFER"){
          // Move stock from global StockStorage to receiver's StoreStorage
          const StockOpt = StockStorage.get(TxOpt.StockId);
          if(!StockOpt) return Err({ NotFound: "Stock not found" });
          if(Number(StockOpt.RemainingStock) < Number(TxOpt.Quantity)) {
            return Err({ Error: "Insufficient remaining stock" });
          }
          const StockProgramOpt = ProgramStorage.get(StockOpt.ProgramId);
          if(!StockProgramOpt) return Err({ NotFound: "Program not found" });

          StockOpt.RemainingStock = (Number(StockOpt.RemainingStock) - Number(TxOpt.Quantity)).toString();
          StockStorage.insert(TxOpt.StockId, StockOpt);

          const receiverStore = StoreStorage.get(TxOpt.ReceiverId);
          if(!receiverStore){
            StoreStorage.insert(TxOpt.ReceiverId, {
              stores: [{ StockId: TxOpt.StockId, ProgramId: StockProgramOpt.ProgramId, StockName: StockOpt.StockName, Quantity: TxOpt.Quantity }]
            });
          } else {
            const idx = receiverStore.stores.findIndex((s: StoreObject) => s.StockId === TxOpt.StockId);
            if(idx >= 0){
              receiverStore.stores[idx].Quantity = (Number(receiverStore.stores[idx].Quantity) + Number(TxOpt.Quantity)).toString();
            } else {
              receiverStore.stores.push({ StockId: TxOpt.StockId, ProgramId: StockProgramOpt.ProgramId, StockName: StockOpt.StockName, Quantity: TxOpt.Quantity });
            }
            StoreStorage.insert(TxOpt.ReceiverId, receiverStore);
          }

        } else if(txType === "DISTRIBUTE"){
          // Move stock from sender's StoreStorage to receiver's StoreStorage
          const senderStore = StoreStorage.get(TxOpt.SenderId);
          if(!senderStore) return Err({ NotFound: "Sender store not found" });
          const itemIdx = senderStore.stores.findIndex((s: StoreObject) => s.StockId === TxOpt.StockId);
          if(itemIdx === -1) return Err({ NotFound: "Stock not in sender store" });
          const item = senderStore.stores[itemIdx];
          if(Number(item.Quantity) < Number(TxOpt.Quantity)) {
            return Err({ Error: "Insufficient stock in sender store" });
          }

          senderStore.stores[itemIdx].Quantity = (Number(item.Quantity) - Number(TxOpt.Quantity)).toString();
          StoreStorage.insert(TxOpt.SenderId, senderStore);

          const receiverStore = StoreStorage.get(TxOpt.ReceiverId);
          if(!receiverStore){
            StoreStorage.insert(TxOpt.ReceiverId, {
              stores: [{ StockId: TxOpt.StockId, ProgramId: item.ProgramId, StockName: item.StockName, Quantity: TxOpt.Quantity }]
            });
          } else {
            const idx = receiverStore.stores.findIndex((s: StoreObject) => s.StockId === TxOpt.StockId);
            if(idx >= 0){
              receiverStore.stores[idx].Quantity = (Number(receiverStore.stores[idx].Quantity) + Number(TxOpt.Quantity)).toString();
            } else {
              receiverStore.stores.push({ StockId: TxOpt.StockId, ProgramId: item.ProgramId, StockName: item.StockName, Quantity: TxOpt.Quantity });
            }
            StoreStorage.insert(TxOpt.ReceiverId, receiverStore);
          }
        }

        const updated: StockTransactions = { ...TxOpt, Status: { ACCEPTED: "ACCEPTED" } };
        StockTransactionStorage.insert(TransactionId, updated);
        return Ok("Transaction approved");
      } catch (error: any) {
        return Err({ Error: `Error occurred ${error.message}` });
      }
    }),

    RejectTransaction: update([text], Result(text, Message), (TransactionId) => {
      try {
        const UserProfileOpt = UserProfileStorage.get(ic.caller());
        if (!UserProfileOpt) return Err({ NoProfile: "No Profile" });
        if (!RoleAuth(UserProfileOpt.Role, "HIGH_OFFICIAL") && !RoleAuth(UserProfileOpt.Role, "LOCAL_LEADER")) {
          return Err({ Unauthorized: "Access Denied" });
        }
        const TxOpt = StockTransactionStorage.get(TransactionId);
        if (!TxOpt) return Err({ NotFound: "Transaction not found" });
        const updated: StockTransactions = {
          ...TxOpt,
          Status: { REJECT: "REJECT" }
        };
        StockTransactionStorage.insert(TransactionId, updated);
        return Ok("Transaction rejected");
      } catch (error: any) {
        return Err({ Error: `Error occurred ${error.message}` });
      }
    }),

    Distribute: update([StockTransactionsProp],Result(text,Message),(payload)=>{
     try{
         const {  StockId, ReceiverId, Quantity } = payload;
         const UserProfileOpt = UserProfileStorage.get(ic.caller());

        if(!UserProfileOpt){
          return Err({NoProfile: "No Profile"})
        }
        const StoreOpt = StoreStorage.get(UserProfileOpt.ProfileId)

        if(!RoleAuth(UserProfileOpt.Role,"LOCAL_LEADER")){
          return Err({Unauthorized: "Access Denied"})
        }

        if(!StoreOpt) {
          return Err({NotFound: "Stock not found"})
        }

        const ItemsExist = StoreOpt.stores.findIndex((item:StoreObject)=>(
          item.StockId == StockId
        ))
        
        if(ItemsExist == -1){
          return Err({NotFound:"Not stock for the item"})
        }

        const StockOpt = StoreOpt.stores[ItemsExist]

        const StockProgramOpt = ProgramStorage.get(StockOpt.ProgramId);

        if(!StockProgramOpt) {
          return Err({ NotFound: "Not program found"})
        }

        if(!StockProgramOpt.Citizens.includes(ReceiverId)){
          return Err({NotFound: "Add citizen to list"})
        }

        if(Number(StockOpt.Quantity) < Number(Quantity)){
          return Err({Error: "No enough stock"})
        }

        const NewTransaction : StockTransactions = {
          TransactionId: uuidv4(),
          StockId,
          SenderId: UserProfileOpt.ProfileId,
          ReceiverId,
          Quantity,
          TransactionType: { DISTRIBUTE: "DISTRIBUTE"},
          Status: { PENDING: "PENDING"},
          CreatedAt: getCurrentDate()
        }

        StockTransactionStorage.insert(NewTransaction.TransactionId, NewTransaction);
        return Ok("Distribution pending approval")
      }catch(error: any) {
        return Err({Error:`Error occured ${error.message}`})
      }
   })

    
    
});

const getCurrentDate = () => {
  const timestamp = new Number(ic.time());
  const date = new Date(timestamp.valueOf() / 1_000_000); 
  return date.toISOString().split('T')[0]; 
};

