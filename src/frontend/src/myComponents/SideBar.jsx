import React, { useState } from 'react';
import { links } from '../constants/LinkConstant';
import { IoLogOut } from 'react-icons/io5';
import { IoClose } from 'react-icons/io5';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { MdSpaceDashboard } from "react-icons/md";
import { logout } from '@/utils/auth';
import { GrTransaction } from 'react-icons/gr';

const SideBar = ({ sideBarStatus, toggleSideBar }) => {
    const [open, setOpen] = useState(true);
    const currentPath = window.location.pathname;

    return (
        <div
            className={`${open ? 'w-64' : 'w-[72px]'} ${sideBarStatus ? 'block' : 'hidden'}
                md:block duration-300 glass-sidebar h-screen overflow-hidden
                absolute sm:relative z-50 flex flex-col`}
        >
            {/* Mobile close */}
            {sideBarStatus && (
                <button
                    className="absolute top-3 right-3 sm:hidden p-1.5 rounded-lg
                               text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                    onClick={() => toggleSideBar(!sideBarStatus)}
                >
                    <IoClose size={20} />
                </button>
            )}

            {/* Collapse toggle */}
            <button
                onClick={() => setOpen(!open)}
                className="absolute -right-3 top-11 w-6 h-6 rounded-full
                           bg-web3-accent border border-web3-accent/50
                           flex items-center justify-center
                           shadow-glow-sm cursor-pointer z-10 text-white"
            >
                {open ? <FaAngleLeft className="w-3 h-3" /> : <FaAngleRight className="w-3 h-3" />}
            </button>

            {/* Logo */}
            <div className="flex items-center gap-3 px-5 py-6 border-b border-white/[0.08]"
                 onClick={() => setOpen(!open)}>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-web3-accent to-web3-purple
                                flex items-center justify-center flex-shrink-0 shadow-glow-sm">
                    {open
                        ? <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinejoin="round" strokeLinecap="round"/>
                          </svg>
                        : <MdSpaceDashboard className="w-5 h-5 text-white" />
                    }
                </div>
                <span className={`font-bold text-xl tracking-tight gradient-text
                                  transition-all duration-300 whitespace-nowrap
                                  ${!open && 'opacity-0 w-0 overflow-hidden'}`}>
                    GovChain
                </span>
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-3 pt-4 space-y-1 overflow-hidden">
                {links.map((link, index) => {
                    const isActive = currentPath === link.path || currentPath.startsWith(link.path + '/');
                    return (
                        <a
                            key={index}
                            href={link.path}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl
                                        no-underline transition-all duration-200 group
                                        ${isActive
                                            ? 'bg-gradient-to-r from-web3-accent/20 to-web3-purple/10 border-l-2 border-web3-accent text-white'
                                            : 'text-white/55 hover:text-white hover:bg-white/[0.06] border-l-2 border-transparent'
                                        }`}
                        >
                            <span className={`text-xl flex-shrink-0 transition-colors
                                              ${isActive ? 'text-web3-accent' : 'group-hover:text-web3-accent'}`}>
                                <link.icon />
                            </span>
                            <span className={`text-sm font-medium whitespace-nowrap
                                              transition-all duration-300
                                              ${!open && 'opacity-0 w-0 overflow-hidden'}`}>
                                {link.name}
                            </span>
                        </a>
                    );
                })}

                {/* Transactions */}
                <a href="/Transactions"
                   className={`flex items-center gap-3 px-3 py-2.5 rounded-xl no-underline
                               transition-all duration-200 group border-l-2
                               ${currentPath === '/Transactions'
                                   ? 'bg-gradient-to-r from-web3-accent/20 to-web3-purple/10 border-web3-accent text-white'
                                   : 'text-white/55 hover:text-white hover:bg-white/[0.06] border-transparent'
                               }`}
                >
                    <span className="text-xl flex-shrink-0 group-hover:text-web3-accent transition-colors">
                        <GrTransaction />
                    </span>
                    <span className={`text-sm font-medium whitespace-nowrap transition-all duration-300 ${!open && 'opacity-0 w-0 overflow-hidden'}`}>
                        Transactions
                    </span>
                </a>
            </nav>

            {/* Bottom: logout */}
            <div className="px-3 py-4 border-t border-white/[0.08]">
                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                               text-white/55 hover:text-red-400 hover:bg-red-500/10
                               transition-all duration-200 group"
                >
                    <span className="text-xl flex-shrink-0"><IoLogOut /></span>
                    <span className={`text-sm font-medium whitespace-nowrap transition-all duration-300 ${!open && 'opacity-0 w-0 overflow-hidden'}`}>
                        Logout
                    </span>
                </button>
            </div>
        </div>
    );
};

export default SideBar;
