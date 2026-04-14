import { Button } from "../components/ui/button"
import { useNavigate } from "react-router-dom"

const roleLabel = {
  HIGH_OFFICIAL: 'Admin',
  LOCAL_LEADER:  'Local Leader',
  CITIZEN:       'Citizen',
}

const roleIcon = {
  HIGH_OFFICIAL: '🏛️',
  LOCAL_LEADER:  '📋',
  CITIZEN:       '🧑‍💼',
}

const Welcome = ({ name, role }) => {
    const navigate = useNavigate();
    const destinations = {
        HIGH_OFFICIAL: () => navigate('/Admin/Dashboard'),
        LOCAL_LEADER:  () => navigate('/Leader/Programs'),
        CITIZEN:       () => navigate('/Citizens/Dashboard'),
    };

    return (
        <div className="min-h-screen bg-web3-dark mesh-bg grid-overlay overflow-hidden relative
                        flex flex-col items-center justify-center">

            {/* Blobs */}
            <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] rounded-full
                            bg-web3-accent/10 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-100px] right-[-150px] w-[400px] h-[400px] rounded-full
                            bg-web3-purple/10 blur-[100px] pointer-events-none" />

            {/* Nav */}
            <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-5
                            border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-web3-accent to-web3-purple
                                    flex items-center justify-center shadow-glow-sm">
                        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white"
                             stroke="currentColor" strokeWidth="2">
                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                                  strokeLinejoin="round" strokeLinecap="round"/>
                        </svg>
                    </div>
                    <span className="font-bold text-xl tracking-tight gradient-text">GovChain</span>
                </div>
            </nav>

            {/* Card */}
            <div className="relative z-10 glass-card max-w-md w-full mx-6 text-center space-y-6 animate-fade-in-up">
                {/* Role icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-web3-accent to-web3-purple
                                flex items-center justify-center text-3xl mx-auto shadow-glow-indigo">
                    {roleIcon[role] || '👤'}
                </div>

                {/* Greeting */}
                <div>
                    <p className="text-white/40 text-sm uppercase tracking-widest mb-1">Welcome back</p>
                    <h1 className="text-2xl font-bold text-white">{name}</h1>
                    <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold
                                     bg-web3-accent/20 text-web3-accent border border-web3-accent/30">
                        {roleLabel[role] || role}
                    </span>
                </div>

                <p className="text-white/50 text-sm leading-relaxed">
                    You are signed in as <span className="text-white font-medium">{roleLabel[role] || role}</span>.
                    Click below to access your dashboard.
                </p>

                {destinations[role] && (
                    <button onClick={destinations[role]}
                            className="btn-web3 w-full animate-pulse-glow">
                        Go to Dashboard
                    </button>
                )}
            </div>
        </div>
    )
}

export default Welcome
