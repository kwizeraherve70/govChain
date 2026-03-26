import { configureStore } from '@reduxjs/toolkit';
import CreateProfileSlice from '../slice/CreateProfileSlice';
import CreateProgramSlice from "../slice/CreateProgramSlice"
import GetAllProgramSlice from '../slice/GetAllProgramSlice';
import ProgramStatSlice from '../slice/ProgramStatSlice';
import CreateStockSlice from '../slice/CreateStockSlice';
import GetAllStockSlice from '../slice/GetAllStockSlice';
import StockStatsSlice from "../slice/StockStatSlice"
import GetAllProfileSlice from '../slice/GetAllProfileSlice';
import CitizenRequestSlice from '../slice/CitizenRequestSlice';
import ViewRequestSlice from '../slice/ViewRequestSlice';
import ApproveRequestSlice from '../slice/ApproveRequestSlice';
import TransferSlice from '../slice/TransferSlice';
import ProgramLeadersSlice from "../slice/ProgramLeaderSlice"
import ProgramCitizensSlice from '../slice/ProgramCitizensSlice';
import GetStoreSlice from '../slice/GetStoreSlice';
import DistributeSlice from '../slice/DistributeSlice';
import GetAllLeaderSlice from "../slice/GetAllLeaderSlice"
import ChangeRoleSlice from '../slice/ChangeRoleSlice';
import AddLeaderToSlice from '../slice/AddLeaderToSlice';
import AllTransactionsSlice from "../slice/AllTransactionSlice"


const store = configureStore({
	reducer: {
		Profile: CreateProfileSlice,
        AllProfile:GetAllProfileSlice,

		Program: CreateProgramSlice,
		AllProgram: GetAllProgramSlice,
		ProgramStat:  ProgramStatSlice,
		// Stock
		CreateStock: CreateStockSlice,
		AllStocks: GetAllStockSlice,
		StockStats: StockStatsSlice,
		
		Citizenrequest: CitizenRequestSlice,
		Viewrequest: ViewRequestSlice,
		Approverequest: ApproveRequestSlice,
		Transfer: TransferSlice,
		ProgramCitizens: ProgramCitizensSlice,
	    ProgramLeaders:ProgramLeadersSlice,
		GetStore: GetStoreSlice,
		Distribute: DistributeSlice,
		GetAllLeader: GetAllLeaderSlice,
		ChangeRole: ChangeRoleSlice,
		AddLeader: AddLeaderToSlice,
		AllTransactions:AllTransactionsSlice

		
	},
});

export default store;
