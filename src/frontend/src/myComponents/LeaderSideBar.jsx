import React, { useState } from 'react';
import { Leaderlinks } from '../constants/LinkConstant';
import { IoLogOut, IoPersonOutline} from 'react-icons/io5';
import { IoClose } from 'react-icons/io5';
import { FaAngleLeft, FaAngleRight} from 'react-icons/fa';
import { MdSpaceDashboard } from "react-icons/md"
import { logout } from '@/utils/auth';
import { GrTransaction } from 'react-icons/gr';

//eslint-disable-next-line react/prop-types
const LeaderSideBar = ({ sideBarStatus, toggleSideBar }) => {
	const [open, setOpen] = useState(true);
	return (
		<div
			className={`${open ? 'w-64' : 'w-20'} ${sideBarStatus ? 'block' : 'hidden'}
				 md:block duration-300 p-5 pt-8 bg-white h-screen border-r border-gray-200
				 dark:bg-gray-800
				  dark:border-gray-500 overflow-hidden absolute sm:relative z-50 
				 dark:text-gray-100`}
		>
			{sideBarStatus && (
				<button
					className="absolute top-1 right-1 sm:hidden p-2 text-gray-600 dark:text-gray-100"
					onClick={() => {
						toggleSideBar(!sideBarStatus);
					}}
				>
					<IoClose size={24} />
				</button>
			)}

            <span
            onClick={() => setOpen(!open)}  
            className="absolute rounded-full cursor-pointer bg-white shadow-md
             -right-1 top-11 w-7
            "> 
               {open ?<FaAngleLeft className="size-5"/>: <FaAngleRight className="size-5"/>} 
            </span>
			<div
				className="flex gap-x-4 items-center mb-9"
				onClick={() => setOpen(!open)}
			>
				{!open &&
                <span>
                <MdSpaceDashboard className="size-7"/>
            </span>
                }
				<h1
					className={`origin-left duration-300 font-bold text-2xl ${!open && 'scale-0'}`}
				>
					GovTransChain
				</h1>
			</div>
			<div className="border-b border-gray-200">
				<ul className="mb-6">
					{Leaderlinks.map((link, index) => (
						<li
							key={index}
							className={`flex items-center gap-x-4 cursor-pointer p-2 mt-1 
                            border-l-4 border-transparent hover:border-violet-500 active:border-violet-500 
                            origin-left duration-100`}
						>
							<a className="text-2xl no-underline" href={link.path}>
								<link.icon />
							</a>
							<a  href={link.path} className={`${!open && 'hidden'} no-underline text-black hover:text-black origin-left duration-100`}>
								{link.name}
							</a>
						</li>
					))}
				</ul>
			</div>
			<div className="relative w-full">
				<ul className="mt-2">
				<li
						
						className={`flex items-center gap-x-4 cursor-pointer p-2 mt-1 
						border-l-4 border-transparent hover:border-violet-500 active:border-violet-500 
						origin-left duration-100`}
					>
						<a className="text-2xl no-underline" href="/Transactions">
							<GrTransaction />
						</a>
						<a  href="/Transactions" className={`${!open && 'hidden'} no-underline text-black hover:text-black origin-left duration-100`}>
						Transactions
						</a>
					</li>
				<li
						
							className={`flex items-center gap-x-4 cursor-pointer p-2 mt-1 
                            border-l-4 border-transparent hover:border-violet-500 active:border-violet-500 
                            origin-left duration-100`}
						>
							<a className="text-2xl no-underline" href="/Profile">
								<IoPersonOutline />
							</a>
							<a  href="/Profile" className={`${!open && 'hidden'} no-underline text-black hover:text-black origin-left duration-100`}>
							Profile
							</a>
						</li>
					<li
						className={`flex items-center gap-x-4 cursor-pointer p-2 mt-1 
                        border-l-4 border-transparent hover:border-violet-500 active:border-violet-500 
                        origin-left duration-100`}
						onClick={logout}
					>
						<span className="text-2xl">
							<IoLogOut />
						</span>
						<span className={`${!open && 'hidden'} origin-left duration-100`}>
							Logout
						</span>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default LeaderSideBar;
