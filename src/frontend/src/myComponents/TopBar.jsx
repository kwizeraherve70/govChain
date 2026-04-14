import React from 'react';
import { IoLogOut, IoMenu, IoPersonOutline } from 'react-icons/io5';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../components/ui/hover-card";
import { logout } from '@/utils/auth';

const TopNavbar = ({ toggleSideBar, sideBarStatus }) => {
    return (
        <nav className="flex items-center justify-between
                        bg-web3-dark/60 backdrop-blur-xl
                        border-b border-white/[0.08]
                        px-5 py-3 sticky top-0 z-40">

            {/* Mobile menu toggle */}
            <div className="sm:hidden">
                <button
                    onClick={() => toggleSideBar(!sideBarStatus)}
                    aria-label="Menu"
                    className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                >
                    <IoMenu className="text-xl" />
                </button>
            </div>

            {/* Spacer */}
            <div className="flex-grow" />

            {/* Right side */}
            <div className="flex items-center gap-3">
                {/* Status indicator */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full
                                bg-web3-green/10 border border-web3-green/20">
                    <span className="w-2 h-2 bg-web3-green rounded-full animate-pulse-slow" />
                    <span className="text-web3-green text-xs font-medium">On-Chain</span>
                </div>

                {/* Profile hover card */}
                <HoverCard>
                    <HoverCardTrigger>
                        <button
                            aria-label="Profile"
                            className="w-9 h-9 rounded-full
                                       bg-gradient-to-br from-web3-accent to-web3-purple
                                       flex items-center justify-center
                                       text-white hover:shadow-glow-indigo
                                       transition-all duration-200"
                        >
                            <IoPersonOutline className="text-base" />
                        </button>
                    </HoverCardTrigger>
                    <HoverCardContent
                        className="w-40 p-1 bg-[#0c0d22]/95 backdrop-blur-xl
                                   border border-white/10 shadow-glass rounded-xl"
                    >
                        <button
                            onClick={logout}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                                       text-white/70 hover:text-red-400 hover:bg-red-500/10
                                       transition-all duration-150 text-sm"
                        >
                            <IoLogOut className="text-base" />
                            <span>Logout</span>
                        </button>
                    </HoverCardContent>
                </HoverCard>
            </div>
        </nav>
    );
};

export default TopNavbar;
