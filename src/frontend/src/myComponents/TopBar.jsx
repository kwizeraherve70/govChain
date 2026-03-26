import React from 'react';
import {
	IoLogOut,
	IoMenu,
	IoPersonOutline,
} from 'react-icons/io5';
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
  } from "../components/ui/hover-card"
import { logout } from '@/utils/auth';


const TopNavbar = ({ toggleSideBar, sideBarStatus }) => {

	return (
		<nav className="flex items-center justify-between bg-white p-2 py-4 dark:bg-gray-800 dark:text-gray-100">
			<div className="sm:hidden">
				<button onClick={() => toggleSideBar(!sideBarStatus)} aria-label="Menu">
					<IoMenu className="text-2xl" />
				</button>
			</div>

			<div className="flex-grow mx-6 max-w-md  p-2 rounded-lg">
				{' '}
				<div className="flex items-center  relative  ">
				</div>
			</div>
			<div className="flex relative items-center space-x-4">
				
				<HoverCard>
  <HoverCardTrigger>
	<button aria-label="Profile">
					<IoPersonOutline className="text-xl" />
			</button></HoverCardTrigger>
  <HoverCardContent>
  <li
						className={`flex items-center gap-x-4 cursor-pointer p-2 mt-1 
                        border-l-4 border-transparent hover:border-violet-500 active:border-violet-500 
                        origin-left duration-100 bg-white shadow-sm`}
						onClick={logout}
					>
						<span className="text-2xl">
							<IoLogOut/>
						</span>
						<span className="">
							Logout
						</span>
					</li>
  </HoverCardContent>
</HoverCard>
			</div>
		</nav>
	);
};

export default TopNavbar;
