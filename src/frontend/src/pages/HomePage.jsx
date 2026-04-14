import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Sphere, MeshDistortMaterial, OrbitControls } from '@react-three/drei'
import { Button } from "../components/ui/button"
import { login, logout } from "@/utils/auth"

/* ── Rotating distorted globe ── */
const GlobeScene = () => {
  const meshRef = useRef()
  const ringRef = useRef()
  const ring2Ref = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.18
      meshRef.current.rotation.x = Math.sin(t * 0.12) * 0.15
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.25
      ringRef.current.rotation.x = 1.2
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.18
      ring2Ref.current.rotation.x = 0.6
    }
  })

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 4, 4]} intensity={2} color="#7c3aed" />
      <pointLight position={[-4, -2, -4]} intensity={1.2} color="#9333ea" />
      <pointLight position={[0, 0, 5]} intensity={0.8} color="#f72585" />

      {/* Main globe */}
      <Sphere ref={meshRef} args={[1.35, 64, 64]}>
        <MeshDistortMaterial
          color="#7c3aed"
          wireframe
          distort={0.18}
          speed={1.5}
          opacity={0.55}
          transparent
        />
      </Sphere>

      {/* Inner solid glow core */}
      <Sphere args={[1.0, 32, 32]}>
        <meshStandardMaterial
          color="#7c3aed"
          emissive="#f72585"
          emissiveIntensity={0.35}
          opacity={0.12}
          transparent
        />
      </Sphere>

      {/* Orbital ring 1 */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.85, 0.012, 8, 100]} />
        <meshStandardMaterial
          color="#f72585"
          emissive="#f72585"
          emissiveIntensity={1.2}
          opacity={0.7}
          transparent
        />
      </mesh>

      {/* Orbital ring 2 */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.1, 0.008, 8, 100]} />
        <meshStandardMaterial
          color="#9333ea"
          emissive="#9333ea"
          emissiveIntensity={1}
          opacity={0.5}
          transparent
        />
      </mesh>
    </>
  )
}

const FeatureCard = ({ icon, title, desc }) => (
  <div className="glass-card flex flex-col gap-3 text-center items-center py-8 px-6">
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-web3-accent to-web3-purple
                    flex items-center justify-center text-2xl shadow-glow-indigo">
      {icon}
    </div>
    <h3 className="font-semibold text-white text-base">{title}</h3>
    <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
  </div>
)

const HomePage = () => {
  return (
    <div className="min-h-screen bg-web3-dark overflow-hidden relative">

      {/* ── Decorative blobs — Krypt signature: large pink on right ── */}
      <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] rounded-full
                      bg-web3-accent/12 blur-[130px] pointer-events-none z-[1]" />
      {/* Krypt signature: hot-pink mega-blob on the right */}
      <div className="absolute top-[-80px] right-[-180px] w-[650px] h-[650px] rounded-full
                      bg-web3-pink/14 blur-[110px] pointer-events-none z-[1]" />
      <div className="absolute top-[20%] right-[-100px] w-[400px] h-[400px] rounded-full
                      bg-web3-pink/8 blur-[90px] pointer-events-none z-[1]" />
      <div className="absolute bottom-[-80px] left-1/2 -translate-x-1/2 w-[600px] h-[250px]
                      bg-web3-accent/6 blur-[100px] pointer-events-none z-[1]" />

      {/* ── Navbar ── */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5
                      border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-web3-accent to-web3-purple
                          flex items-center justify-center shadow-glow-sm">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white" stroke="currentColor" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinejoin="round" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="font-bold text-xl tracking-tight gradient-text">GovChain</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-block text-white/40 text-sm">
            Blockchain-Powered Governance
          </span>
          {window.auth?.isAuthenticated
            ? <button onClick={logout} className="btn-web3 text-sm px-5 py-2.5">Disconnect</button>
            : <button onClick={login}  className="btn-web3 text-sm px-5 py-2.5">Connect Wallet</button>
          }
        </div>
      </nav>

      {/* ── Hero ── */}
      <main className="relative z-10 flex flex-col lg:flex-row items-center justify-center
                       px-6 pt-16 pb-16 gap-12 max-w-6xl mx-auto min-h-[80vh]">

        {/* Left: text */}
        <div className="flex-1 flex flex-col items-center lg:items-start gap-8 text-center lg:text-left">

          {/* Badge */}
          <div className="opacity-0 animate-fade-in-up inline-flex items-center gap-2
                          bg-web3-accent/10 border border-web3-accent/30
                          rounded-full px-4 py-1.5 text-sm text-web3-accent">
            <span className="w-2 h-2 bg-web3-accent rounded-full animate-pulse-slow" />
            On-Chain Government Transparency
          </div>

          {/* Headline */}
          <h1 className="opacity-0 animate-fade-in-up delay-200
                         text-5xl sm:text-6xl font-extrabold leading-tight tracking-tight">
            <span className="gradient-text animate-gradient-shift">Secure</span>{" "}
            <span className="text-white">Government</span>
            <br />
            <span className="text-white">Transactions on</span>{" "}
            <span className="gradient-text animate-gradient-shift">Chain</span>
          </h1>

          {/* Sub-headline */}
          <p className="opacity-0 animate-fade-in-up delay-300
                        text-white/55 text-lg max-w-xl leading-relaxed">
            Immutable records, real-time transparency, and tamper-proof traceability —
            redefining how public resources are managed.
          </p>

          {/* CTA */}
          <div className="opacity-0 animate-fade-in-up delay-500 flex flex-col sm:flex-row gap-4">
            {window.auth?.isAuthenticated
              ? <button onClick={logout} className="btn-web3 text-base px-8 py-3.5 animate-pulse-glow">
                  Disconnect
                </button>
              : <button onClick={login} className="btn-web3 text-base px-8 py-3.5 animate-pulse-glow">
                  Launch App
                </button>
            }
            <a href="#features"
               className="btn-web3-outline text-base px-8 py-3.5 inline-block text-center no-underline">
              Learn More
            </a>
          </div>

          {/* Stats strip */}
          <div className="opacity-0 animate-fade-in-up delay-700
                          flex flex-wrap justify-center lg:justify-start gap-8">
            {[
              { label: "Tamper-Proof",  icon: "🔒" },
              { label: "Transparent",   icon: "🔍" },
              { label: "Real-Time",     icon: "⚡" },
              { label: "Decentralized", icon: "🌐" },
            ].map(({ label, icon }) => (
              <div key={label} className="flex items-center gap-2 text-white/50 text-sm">
                <span>{icon}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: 3D Globe */}
        <div className="opacity-0 animate-fade-in-up delay-300
                        flex-shrink-0 w-[320px] h-[320px] sm:w-[420px] sm:h-[420px]
                        relative">
          {/* Glow halo behind globe — violet + pink */}
          <div className="absolute inset-0 rounded-full
                          bg-web3-accent/15 blur-[60px] pointer-events-none" />
          <div className="absolute inset-[-20px] rounded-full
                          bg-web3-pink/10 blur-[80px] pointer-events-none" />
          <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
            <GlobeScene />
          </Canvas>
        </div>

      </main>

      {/* ── Feature cards ── */}
      <section id="features" className="relative z-10 max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <FeatureCard
            icon="⛓️"
            title="Blockchain Security"
            desc="Every transaction is cryptographically sealed and stored on-chain — no tampering possible."
          />
          <FeatureCard
            icon="🏛️"
            title="Government Grade"
            desc="Built for public programs, aid distribution, and inter-agency resource management."
          />
          <FeatureCard
            icon="📊"
            title="Live Transparency"
            desc="Stakeholders see exactly where resources flow, in real-time, with full audit trails."
          />
        </div>
      </section>

      {/* ── Footer strip ── */}
      <footer className="relative z-10 border-t border-white/[0.06] py-5 text-center
                         text-white/30 text-xs">
        GovTransChain &nbsp;·&nbsp; Blockchain-powered public accountability
      </footer>

    </div>
  )
}

export default HomePage
