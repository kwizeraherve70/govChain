import {  MdSpaceDashboard ,MdEmojiPeople} from 'react-icons/md';
import { AiOutlineStock } from "react-icons/ai";
import { RxActivityLog } from "react-icons/rx";
import { GrTransaction } from "react-icons/gr";
import { IoPersonOutline } from 'react-icons/io5';


const links = [
	{
		name: 'Dashboard',
		path: '/Admin/Dashboard',
		icon: MdSpaceDashboard,
	},
	{
		name: 'Program',
		path: '/Admin/Programs',
		icon: RxActivityLog ,
	},
	{
		name: 'Stock',
		path: '/Admin/Stocks',
		icon: AiOutlineStock ,
	},
	{
		name: "Users",
		path: "/Admin/Users",
		icon: MdEmojiPeople
	}
];

const Leaderlinks = [
	{
		name: 'Program',
		path: '/Leader/Programs',
		icon: RxActivityLog ,
	},
	{
		name: 'Stock',
		path: '/Leader/Stocks',
		icon: AiOutlineStock ,
	},
	
];

const Citizenlinks = [
	{
		name: 'Dashboard',
		path: '/Citizens/Dashboard',
		icon: MdSpaceDashboard,
	},
	{
		name: 'Program',
		path: '/Citizens/Programs',
		icon: RxActivityLog ,
	},
	{
		name: 'Pending Stock',
		path: '/Citizens/Stocks',
		icon: AiOutlineStock ,
	},
	
	
];


export { links, Leaderlinks, Citizenlinks  };
