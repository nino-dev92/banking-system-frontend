import React, { useState, type FormEvent, } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/NavBar";
import useAxios from "../api/apiAxios";
import {Toaster, toast} from "sonner";

const Signup: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
   const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be 6 digits");
      return;
    }
    const body = {
      username: username.trim().toLowerCase(),
      password,
    }
    
    try {
      const response = await useAxios.post(
        "/auth/signup",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      setUsername("");
      setPassword("");
      if (response.status === 201) {
        toast.success("Signup successful");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error: any) {
      toast.error(error.response.data?.error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-['Outfit']">
      <Toaster position="top-right" richColors />
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200">
          
          {/* Left Panel - Visuals & Branding */}
          <div className="hidden md:flex flex-col justify-between p-12 bg-slate-900 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

            <div className="relative z-10">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-2xl font-black mb-8 shadow-lg shadow-blue-600/20">
                C
              </div>
              <h2 className="text-4xl font-bold leading-tight tracking-tight">
                Secure Your <br />
                <span className="text-emerald-400">Financial Legacy.</span>
              </h2>
              <p className="mt-6 text-slate-400 text-lg leading-relaxed max-w-sm font-light">
                Join the elite circle of institutional investors. Our sovereign 
                vault architecture ensures maximum asset resiliency.
              </p>
            </div>

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3 text-emerald-400">
                <div className="w-5 h-5 rounded-full border border-emerald-400/30 flex items-center justify-center bg-emerald-400/10">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Quantum-Safe Encryption</span>
              </div>
              <div className="flex items-center gap-3 text-emerald-400">
                <div className="w-5 h-5 rounded-full border border-emerald-400/30 flex items-center justify-center bg-emerald-400/10">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Institutional Governance</span>
              </div>
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="p-8 sm:p-16 flex flex-col justify-center">
            <header className="mb-10 text-center md:text-left">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create Access</h1>
              <p className="text-slate-500 mt-2 font-medium">Initialize your institutional profile to begin.</p>
            </header>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Desired Username</label>
                <input
                  type="text"
                  placeholder="Choose your system ID"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Secure Password</label>
                <div className="relative group">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Minimum 6 characters"
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors uppercase tracking-widest"
                  >
                    {passwordVisible ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-slate-900 hover:bg-black text-white font-bold py-5 rounded-2xl shadow-xl shadow-slate-900/10 transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-3 uppercase text-xs tracking-widest"
              >
                Request Authorization
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </button>
            </form>

            <div className="mt-10 text-center text-sm">
              <span className="text-slate-400">Already a registered client? </span>
              <button 
                onClick={() => navigate("/login")}
                className="text-emerald-600 font-bold hover:underline underline-offset-4"
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="p-8 text-center border-t border-slate-200">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] max-w-2xl mx-auto leading-relaxed">
          Security Protocol: AES-256-GCM Authorized Service Node. All transmissions monitored and logged.
        </p>
      </footer>
    </div>
  );
};

export default Signup;
