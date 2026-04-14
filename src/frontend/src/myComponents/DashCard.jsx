import React from "react"

const glowMap = [
  'card-glow-indigo',
  'card-glow-purple',
  'card-glow-cyan',
]

const gradMap = [
  'from-web3-accent/20 to-web3-accent/5',
  'from-web3-purple/20 to-web3-purple/5',
  'from-web3-pink/20 to-web3-pink/5',
]

const iconBgMap = [
  'from-web3-accent to-web3-purple',
  'from-web3-purple to-web3-pink',
  'from-web3-pink to-web3-accent',
]

const iconMap = ['👥', '📋', '📦']

const DashCard = ({ name, account, index = 0 }) => {
    const idx = index % 3
    return (
        <div className={`relative overflow-hidden rounded-2xl p-6
                         bg-white/[0.05] backdrop-blur-lg border border-white/[0.1]
                         ${glowMap[idx]}
                         hover:border-white/20 hover:bg-white/[0.07]
                         transition-all duration-300 group`}
        >
            {/* Gradient accent background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradMap[idx]} opacity-40 pointer-events-none`} />

            {/* Icon */}
            <div className={`relative w-11 h-11 rounded-xl mb-4
                             bg-gradient-to-br ${iconBgMap[idx]}
                             flex items-center justify-center text-xl
                             shadow-glow-sm`}>
                {iconMap[idx]}
            </div>

            {/* Content */}
            <div className="relative">
                <p className="text-white/50 text-sm font-medium mb-1">{name}</p>
                <p className="text-3xl font-bold text-white">{account}</p>
            </div>

            {/* Decorative corner glow */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full
                            bg-web3-accent/10 blur-2xl pointer-events-none
                            group-hover:bg-web3-accent/20 transition-colors duration-500" />
        </div>
    )
}

export default DashCard
