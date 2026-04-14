import React, { useState, useContext } from "react";
import { DatePickerDemo } from "./DateInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import Welcome from "./Welcome";
import TopNavbar from "./TopBar";
import AuthContext from "../context/AuthContext";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { ProfileValid } from "@/validation/profileValid";
import { CreateProfileThunk } from "@/Redux/action/createProfile";
import { BeatLoader } from "react-spinners";
import {
  User, Mail, CreditCard, Phone,
  MapPin, Building2, Grid3x3, Home,
  Calendar, ChevronRight, ChevronLeft,
  CheckCircle2, Shield, Accessibility,
} from "lucide-react";

/* ── Styled input with left icon ── */
const Field = ({ icon: Icon, label, error, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold uppercase tracking-widest text-white/70">
      {label}
    </label>
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl
                     bg-white/[0.08] border transition-all duration-200
                     focus-within:bg-white/[0.12]
                     ${error
                       ? "border-red-500/80 focus-within:border-red-500"
                       : "border-white/[0.25] focus-within:border-web3-accent focus-within:shadow-[0_0_0_3px_rgba(124,58,237,0.2)]"
                     }`}>
      <Icon className={`w-4 h-4 flex-shrink-0 ${error ? "text-red-400" : "text-web3-accent"}`} />
      {children}
    </div>
    {error && (
      <p className="text-xs text-red-400 flex items-center gap-1 mt-0.5">
        <span className="w-1 h-1 rounded-full bg-red-400 flex-shrink-0" />
        {error}
      </p>
    )}
  </div>
);

const inputCls = "flex-1 bg-transparent text-white text-sm placeholder:text-white/45 outline-none";

/* ── Step definitions ── */
const STEPS = [
  { label: "Personal",  icon: User,    desc: "Your basic identity information" },
  { label: "Address",   icon: MapPin,  desc: "Your administrative location"    },
  { label: "Complete",  icon: Shield,  desc: "Date of birth, gender & accessibility" },
];

const ProfileForm = () => {
  const [step, setStep]       = useState(0);
  const [date, setDate]       = useState();
  const [Gender, setGender]   = useState("");
  const [disability, setDisability] = useState("");
  const [dateError, setDateError]     = useState("");
  const [genderError, setGenderError] = useState("");

  const { hasProfile, name, Role } = useContext(AuthContext);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(ProfileValid),
  });

  const dispatch = useDispatch();
  const { load } = useSelector((state) => state.Profile);

  if (hasProfile) return <Welcome name={name} role={Role} />;

  function formatDate(inputDateStr) {
    const d = new Date(inputDateStr);
    d.setDate(d.getDate() - 1);
    const f = d.toDateString().slice(4, 10) + " " + d.getFullYear();
    return f.split(" ").join("-");
  }

  const submit = (data) => {
    let valid = true;
    if (!date) {
      setDateError("Date of birth is required");
      valid = false;
    } else {
      setDateError("");
    }
    if (!Gender) {
      setGenderError("Gender is required");
      valid = false;
    } else {
      setGenderError("");
    }
    if (!valid) return;

    const { Province, District, Sector, Cell, Email, Fullname, Phone, NationalId } = data;
    dispatch(CreateProfileThunk({
      Email, Fullname, Phone, NationalId,
      DateOfBirthday: formatDate(date),
      Gender,
      Disability: disability.trim() || null,
      Address: { Province, District, Sector, Cell },
    }));
  };

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <>
      <TopNavbar />

      <div className="min-h-[calc(100vh-57px)] bg-web3-dark relative overflow-hidden
                      flex items-center justify-center px-4 py-10">

        {/* Blobs */}
        <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] rounded-full
                        bg-web3-accent/20 blur-[120px] pointer-events-none z-[1]" />
        <div className="absolute bottom-[-100px] right-[-150px] w-[400px] h-[400px] rounded-full
                        bg-web3-purple/20 blur-[100px] pointer-events-none z-[1]" />

        <div className="relative z-10 w-full max-w-4xl animate-fade-in-up" style={{zIndex:2}}>

          {/* ── Outer glass wrapper ── */}
          <div className="rounded-3xl overflow-hidden border border-white/[0.2]
                          shadow-[0_24px_80px_rgba(0,0,0,0.7)]
                          bg-[#0e0f2a]/90 backdrop-blur-2xl
                          flex flex-col lg:flex-row">

            {/* ── Left panel ── */}
            <div className="lg:w-[38%] bg-gradient-to-br from-web3-accent/30 via-web3-purple/15 to-transparent
                            border-b lg:border-b-0 lg:border-r border-white/[0.15]
                            p-8 flex flex-col justify-between gap-8">

              {/* Brand */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-web3-accent to-web3-purple
                                flex items-center justify-center shadow-glow-sm flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white"
                       stroke="currentColor" strokeWidth="2">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                          strokeLinejoin="round" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="font-bold text-xl tracking-tight gradient-text">GovChain</span>
              </div>

              {/* Heading */}
              <div>
                <h1 className="text-2xl font-extrabold text-white leading-snug mb-2">
                  Complete Your<br />
                  <span className="gradient-text">On-Chain Profile</span>
                </h1>
                <p className="text-white/65 text-sm leading-relaxed">
                  Your identity is stored securely on the Internet Computer blockchain — tamper-proof and fully private.
                </p>
              </div>

              {/* Step list */}
              <div className="flex flex-col gap-3">
                {STEPS.map((s, i) => {
                  const Icon = s.icon;
                  const done    = i < step;
                  const current = i === step;
                  return (
                    <div key={i}
                         className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                                     ${current ? "bg-white/[0.12] border border-white/[0.25]" : "opacity-60"}`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                                       transition-all duration-300
                                       ${done    ? "bg-web3-green/20 text-web3-green"
                                       : current ? "bg-gradient-to-br from-web3-accent to-web3-purple text-white"
                                                 : "bg-white/[0.06] text-white/30"}`}>
                        {done
                          ? <CheckCircle2 className="w-4 h-4" />
                          : <Icon className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{s.label}</p>
                        <p className="text-xs text-white/60">{s.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex justify-between text-xs text-white/60 mb-2">
                  <span>Progress</span>
                  <span>{Math.round(((step) / (STEPS.length - 1)) * 100)}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-web3-accent to-web3-purple
                               transition-all duration-500"
                    style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* ── Right panel: form ── */}
            <div className="flex-1 p-8 flex flex-col justify-between gap-8">

              <form onSubmit={handleSubmit(submit)} className="flex flex-col h-full gap-8">

                {/* Step header */}
                <div>
                  <p className="text-xs uppercase tracking-widest text-web3-accent font-semibold mb-1">
                    Step {step + 1} of {STEPS.length}
                  </p>
                  <h2 className="text-xl font-bold text-white">
                    {step === 0 && "Personal Information"}
                    {step === 1 && "Address Details"}
                    {step === 2 && "Final Details"}
                  </h2>
                  <p className="text-white/60 text-sm mt-1">{STEPS[step].desc}</p>
                </div>

                {/* Step 1 — Personal */}
                {step === 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field icon={User} label="Full Name" error={errors.Fullname?.message}>
                      <input className={inputCls} placeholder="John Doe"
                             {...register("Fullname")} />
                    </Field>
                    <Field icon={Mail} label="Email Address" error={errors.Email?.message}>
                      <input className={inputCls} type="email" placeholder="john@example.com"
                             {...register("Email")} />
                    </Field>
                    <Field icon={CreditCard} label="National Identity" error={errors.NationalId?.message}>
                      <input className={inputCls} type="number" placeholder="1 2000 8 0123456 7 89"
                             {...register("NationalId")} />
                    </Field>
                    <Field icon={Phone} label="Phone Number" error={errors.Phone?.message}>
                      <input className={inputCls} placeholder="+250 7XX XXX XXX"
                             {...register("Phone")} />
                    </Field>
                  </div>
                )}

                {/* Step 2 — Address */}
                {step === 1 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field icon={MapPin} label="Province" error={errors.Province?.message}>
                      <input className={inputCls} placeholder="e.g. Kigali"
                             {...register("Province")} />
                    </Field>
                    <Field icon={Building2} label="District" error={errors.District?.message}>
                      <input className={inputCls} placeholder="e.g. Gasabo"
                             {...register("District")} />
                    </Field>
                    <Field icon={Grid3x3} label="Sector" error={errors.Sector?.message}>
                      <input className={inputCls} placeholder="e.g. Kimironko"
                             {...register("Sector")} />
                    </Field>
                    <Field icon={Home} label="Cell" error={errors.Cell?.message}>
                      <input className={inputCls} placeholder="e.g. Bibare"
                             {...register("Cell")} />
                    </Field>
                  </div>
                )}

                {/* Step 3 — DOB + Gender */}
                {step === 2 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <Field icon={Calendar} label="Date of Birth" error={dateError}>
                      <div className="flex-1">
                        <DatePickerDemo date={date} setDate={(v) => { setDate(v); if (v) setDateError(""); }} />
                      </div>
                    </Field>
                    <Field icon={User} label="Gender" error={genderError}>
                      <Select onValueChange={(v) => { setGender(v); setGenderError(""); }}>
                        <SelectTrigger className="flex-1 bg-transparent border-none p-0 h-auto
                                                  text-sm text-white shadow-none focus:ring-0">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0c0d22] border border-white/10 text-white rounded-xl">
                          <SelectItem value="Male"   className="focus:bg-web3-accent/20">Male</SelectItem>
                          <SelectItem value="Female" className="focus:bg-web3-accent/20">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>

                    {/* Disability — optional */}
                    <div className="sm:col-span-2 flex flex-col gap-1.5">
                      <label className="text-xs font-semibold uppercase tracking-widest text-white/70 flex items-center gap-2">
                        <Accessibility className="w-3.5 h-3.5 text-web3-accent" />
                        Disability
                        <span className="normal-case tracking-normal font-normal text-white/30 text-xs">— optional</span>
                      </label>
                      <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-white/[0.08]
                                      border border-white/[0.25] focus-within:border-web3-accent
                                      focus-within:bg-white/[0.12] focus-within:shadow-[0_0_0_3px_rgba(124,58,237,0.2)]
                                      transition-all duration-200">
                        <Accessibility className="w-4 h-4 text-web3-accent flex-shrink-0 mt-0.5" />
                        <textarea
                          rows={2}
                          value={disability}
                          onChange={(e) => setDisability(e.target.value)}
                          placeholder="e.g. Visual impairment, mobility limitation… (leave blank if none)"
                          className="flex-1 bg-transparent text-white text-sm placeholder:text-white/45
                                     outline-none resize-none leading-relaxed"
                        />
                      </div>
                    </div>

                    {/* Summary preview */}
                    <div className="sm:col-span-2 rounded-2xl bg-white/[0.03] border border-white/[0.08] p-5">
                      <p className="text-xs uppercase tracking-widest text-white/30 mb-3 font-semibold">
                        Profile Summary
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {[
                          ["Name",     "Fullname"  ],
                          ["Email",    "Email"     ],
                          ["NID",      "NationalId"],
                          ["Phone",    "Phone"     ],
                          ["Province", "Province"  ],
                          ["District", "District"  ],
                        ].map(([label]) => (
                          <div key={label} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-web3-accent/60 flex-shrink-0" />
                            <span className="text-white/40 text-xs">{label}</span>
                            <span className="text-web3-green text-xs ml-auto">✓</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation buttons */}
                <div className="flex items-center justify-between mt-auto pt-4
                                border-t border-white/[0.06]">
                  {step > 0 ? (
                    <button type="button" onClick={prev}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl
                                       border border-white/[0.12] text-white/60
                                       hover:text-white hover:border-white/25 hover:bg-white/[0.05]
                                       transition-all duration-200 text-sm font-medium">
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                  ) : <div />}

                  {step < STEPS.length - 1 ? (
                    <button type="button" onClick={next}
                            className="btn-web3 flex items-center gap-2 px-6 py-2.5 text-sm">
                      Continue <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button type="submit" disabled={load}
                            className={`btn-web3 flex items-center gap-2 px-8 py-2.5 text-sm
                                        animate-pulse-glow min-w-[160px] justify-center
                                        ${load ? "opacity-60 cursor-not-allowed" : ""}`}>
                      {load
                        ? <BeatLoader color="#ffffff" size={8} />
                        : <><CheckCircle2 className="w-4 h-4" /> Create Profile</>
                      }
                    </button>
                  )}
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileForm;
